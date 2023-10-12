"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Characters, Planets, Starships, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

#Ruta para creación de token
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'error': 'Bad username or password'}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({'token': access_token, 'user_id': user.id}), 200


# Rutas para usuarios
@api.route('/user', methods=['GET'])
def get_users():
    users= User.query.all()
    all_users = list(map(lambda item: item.serialize(), users))
    if all_users == []:
         raise APIException('There are no users', status_code=404)
    return jsonify(all_users), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    chosen_user = User.query.filter_by(id=user_id).first()
    if chosen_user is None:
         raise APIException('User does not exist', status_code=404)
    return jsonify(chosen_user.serialize()), 200

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    request_body_user = request.get_json()
    chosen_user = User.query.get(user_id)
    if chosen_user is None:
        raise APIException('User not found', status_code=404)
    if 'password' in request_body_user:
        chosen_user.password = request_body_user['password']
    if 'email' in request_body_user:
        chosen_user.email = request_body_user['email']
    db.session.commit()
    return jsonify('User successfully updated'), 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    chosen_user = User.query.get(user_id)
    if chosen_user is None:
        raise APIException('User not found', status_code=404)
    db.session.delete(chosen_user)
    db.session.commit()
    return jsonify('User successfully deleted'), 200


#Ruta para inicio de sesión
@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        raise APIException('Invalid email or password', status_code=401) 
    access_token = create_access_token(identity=user.id)
    return jsonify({'token': access_token, 'user_id': user.id}), 200


#Ruta para registrar nuevo usuario
@api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message':'User already exists'}), 400
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'User successfully created'}), 201


# Rutas para favoritos
@api.route('/user/<int:user_id>/favorites', methods=['GET'])
def get_user_favorites(user_id):
    user = User.query.get(user_id)
    if not user:
        raise APIException('User not found', status_code=404)
    user_favorites = Favorites.query.filter_by(user_id=user_id).all()
    serialized_favorites = [favorite.serialize() for favorite in user_favorites]
    if not serialized_favorites:
        raise APIException('User has no favorites', status_code=404)
    return jsonify(serialized_favorites), 200

@api.route('/user/<int:user_id>/favorites', methods=['POST'])
def add_favorite(user_id):
    data = request.get_json()
    resource_type = data.get('resource_type')
    resource_id = data.get('resource_id')
    user = User.query.get(user_id)
    if not user:
        raise APIException('User not found', status_code=404)
    if not resource_type or not resource_id:
        raise APIException('Invalid request data', status_code=400)
    if resource_type not in ['people', 'planets', 'starships']:
        raise APIException('Invalid resource type', status_code=400)
    if resource_type == 'people':
        favorite = Favorites.query.filter_by(user_id=user_id, character_id=resource_id).first()
    elif resource_type == 'planets':
        favorite = Favorites.query.filter_by(user_id=user_id, planet_id=resource_id).first()
    elif resource_type == 'starships':
        favorite = Favorites.query.filter_by(user_id=user_id, starship_id=resource_id).first()
    if favorite:
        raise APIException('The item is already on the favorites list', status_code=400)
    if resource_type == 'people':
        favorite = Favorites(user_id=user_id, character_id=resource_id)
    elif resource_type == 'planets':
        favorite = Favorites(user_id=user_id, planet_id=resource_id)
    elif resource_type == 'starships':
        favorite = Favorites(user_id=user_id, starship_id=resource_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify('Favorite successfully added'), 200

@api.route('/user/<int:user_id>/favorites/<int:favorite_id>', methods=['DELETE'])
def delete_favorite(user_id, favorite_id):
    user = User.query.get(user_id)
    if not user:
        raise APIException('User not found', status_code=404)
    favorite = Favorites.query.filter_by(id=favorite_id, user_id=user_id).first()
    if not favorite:
        raise APIException('Favorite not found', status_code=404)
    db.session.delete(favorite)
    db.session.commit()
    return jsonify('Favorite successfully deleted'), 200


# Rutas para personajes
@api.route('/people', methods=['GET'])
def get_characters():
    character_query = Characters.query.all()
    result = {
        'results': [
            {
                'uid': str(character.id),
                'name': character.name,
                'url': f'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/people/{character.id}'
            }
            for character in character_query
        ]
    }
    if not result['results']:
         raise APIException('There are no characters', status_code=404)
    return jsonify(result), 200

@api.route('/people/<int:character_id>', methods=['GET'])
def character(character_id):
    character_query = Characters.query.filter_by(id= character_id).first()
    if character_query is None:
         raise APIException('The character does not exist', status_code=404)
    result = {
        'result': {
            'properties': {
                'height': character_query.height,
                'mass': character_query.mass,
                'hair_color': character_query.hair_color,
                'skin_color': character_query.skin_color,
                'eye_color': character_query.eye_color,
                'birth_year': character_query.birth_year,
                'gender': character_query.gender,
                'name': character_query.name,
                'url': f'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/people/{character_query.id}'
            },
            'uid': str(character_query.id)
        }
    }
    return jsonify(result), 200

@api.route('/people', methods=['POST'])
def create_character():
    request_body_user = request.get_json()
    new_character = Characters(height=request_body_user['height'], mass=request_body_user['mass'], hair_color=request_body_user['hair_color'], skin_color=request_body_user['skin_color'], eye_color=request_body_user['eye_color'], birth_year=request_body_user['birth_year'], gender=request_body_user['gender'], name=request_body_user['name'])
    db.session.add(new_character)
    db.session.commit()
    return jsonify(request_body_user), 200

@api.route('/people/<int:character_id>', methods=['DELETE'])
def delete_character(character_id):
    chosen_character = Characters.query.get(character_id)
    if chosen_character is None:
        raise APIException('Character not found', status_code=404)
    db.session.delete(chosen_character)
    db.session.commit()
    return jsonify('Character successfully deleted'), 200


# Rutas para planetas
@api.route('/planets', methods=['GET'])
def get_planets():
    planet_query = Planets.query.all()
    result = {
        'results': [
            {
                'uid': str(planet.id),
                'name': planet.name,
                'url': f'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/planets/{planet.id}'
            }
            for planet in planet_query
        ]
    }
    if not result['results']:
         raise APIException('There are no planets', status_code=404)
    return jsonify(result), 200

@api.route('/planets/<int:planet_id>', methods=['GET'])
def planet(planet_id):
    planet_query = Planets.query.filter_by(id=planet_id).first()
    if planet_query is None:
        raise APIException('The planet does not exist', status_code=404)
    result = {
        'result': {
            'properties': {
                'name': planet_query.name,
                'rotation_period': planet_query.rotation_period,
                'orbital_period': planet_query.orbital_period,
                'diameter': planet_query.diameter,
                'climate': planet_query.climate,
                'gravity': planet_query.gravity,
                'terrain': planet_query.terrain,
                'surface_water': planet_query.surface_water,
                'population': planet_query.population,
                'url': f'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/planets/{planet_query.id}'
            },
            'uid': str(planet_query.id),
        }
    }

    return jsonify(result), 200

@api.route('/planets', methods=['POST'])
def create_planet():
    request_body_user = request.get_json()
    new_planet = Planets(diameter=request_body_user['diameter'], rotation_period=request_body_user['rotation_period'], orbital_period=request_body_user['orbital_period'], gravity=request_body_user['gravity'], population=request_body_user['population'], climate=request_body_user['climate'], terrain=request_body_user['terrain'], surface_water=request_body_user['surface_water'], name=request_body_user['name'])
    db.session.add(new_planet)
    db.session.commit()
    return jsonify(request_body_user), 200

@api.route('/planets/<int:planet_id>', methods=['DELETE'])
def delete_planet(planet_id):
    chosen_planet = Planets.query.get(planet_id)
    if chosen_planet is None:
        raise APIException('Planet not found', status_code=404)
    db.session.delete(chosen_planet)
    db.session.commit()
    return jsonify('Planet successfully deleted'), 200


# Rutas para naves
@api.route('/starships', methods=['GET'])
def get_starships():
    starship_query = Starships.query.all()
    result = {
        'results': [
            {
                'uid': str(starship.id),
                'name': starship.name,
                'url': f'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/starships/{starship.id}'
            }
            for starship in starship_query
        ]
    }
    if not result['results']:
         raise APIException('There are no starships', status_code=404)
    return jsonify(result), 200

@api.route('/starships/<int:starship_id>', methods=['GET'])
def starship(starship_id):
    starship_query = Starships.query.filter_by(id=starship_id).first()
    if starship_query is None:
        raise APIException('The starship does not exist', status_code=404)
    result = {
        'result': {
            'properties': {
                'name': starship_query.name,
                'model': starship_query.model,
                'manufacturer': starship_query.manufacturer,
                'cost_in_credits': starship_query.cost_in_credits,
                'length': starship_query.length,
                'max_atmosphering_speed': starship_query.max_atmosphering_speed,
                'crew': starship_query.crew,
                'passengers': starship_query.passengers,
                'cargo_capacity': starship_query.cargo_capacity,
                'consumables': starship_query.consumables,
                'hyperdrive_rating': starship_query.hyperdrive_rating,
                'MGLT': starship_query.MGLT,
                'starship_class': starship_query.starship_class,
                'url': f'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/starships/{starship_query.id}'
            },
            'uid': str(starship_query.id)
        }
    }

    return jsonify(result), 200

@api.route('/starships', methods=['POST'])
def create_starship():
    request_body_user = request.get_json()
    new_starship = Starships(model=request_body_user['model'], starship_class=request_body_user['starship_class'], manufacturer=request_body_user['manufacturer'], cost_in_credits=request_body_user['cost_in_credits'], length=request_body_user['length'], crew=request_body_user['crew'], passengers=request_body_user['passengers'], max_atmosphering_speed=request_body_user['max_atmosphering_speed'], hyperdrive_rating=request_body_user['hyperdrive_rating'], MGLT=request_body_user['MGLT'], cargo_capacity=request_body_user['cargo_capacity'], consumables=request_body_user['consumables'], name=request_body_user['name'])
    db.session.add(new_starship)
    db.session.commit()
    return jsonify(request_body_user), 200

@api.route('/starships/<int:starship_id>', methods=['DELETE'])
def delete_starship(starship_id):
    chosen_starship = Starships.query.get(starship_id)
    if chosen_starship is None:
        raise APIException('Starship not found', status_code=404)
    db.session.delete(chosen_starship)
    db.session.commit()
    return jsonify('Starship successfully deleted'), 200