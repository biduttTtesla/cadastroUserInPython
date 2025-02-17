from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}) # Permitir requisições de http://localhost:8080

# Configuração do PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost/usuarios'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Criar um modelo de exemplo
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f'<Usuario {self.nome}>'

# Criar as tabelas no banco de dados
with app.app_context():
    db.create_all()

# TODAS AS ROTAS
@app.route('/')
def test_connection():
    try:
        # Usar 'text()' para envolver a consulta SQL
        result = db.session.execute(text("SELECT 1"))
        return "Conexão bem-sucedida ao banco de dados!"
    except Exception as e:
        return f"Erro na conexão: {str(e)}"

@app.route('/addUser', methods=["POST"])
def addUser():
    dados = request.json
    nome = dados.get('name')  # Corrigir para nome
    email = dados.get('email')

    usuarioExist = Usuario.query.filter_by(email = email).first()
    
    if usuarioExist:
        return jsonify({"erro": "E-mail já cadastrado!"}), 400 
    
    if not nome or not email:
        return jsonify({"erro": "Nome e email são obrigatórios!"}), 400

    novo_usuario = Usuario(nome=nome, email=email)  # Passando o campo correto 'nome'

    try:
        db.session.add(novo_usuario)
        db.session.commit()
        return jsonify({"message": "Usuário criado com sucesso!"}), 201  # Retorno de sucesso com status 201
    except Exception as e:
        print(str(e))
    return jsonify({"erro": "Erro ao cadastrar o usuário!"}), 500
    

@app.route("/getUsers", methods=["GET"])
def getUsers():
    try:
        # Buscar todos os usuários no banco
        usuarios = Usuario.query.all()

        # Converter os objetos em dicionário para enviar como JSON
        usuarios_json = [
            {"id": usuario.id, "nome": usuario.nome, "email": usuario.email}
            for usuario in usuarios
        ]

        return jsonify(usuarios_json), 200  # Retorna os usuários com status 200 (OK)

    except Exception as e:
        print(str(e))
        return jsonify({"erro": "Erro ao buscar os usuários!"}), 500  # Erro interno do servidor
    


@app.route("/deletUser/<int:id>", methods=["DELETE"])
def deleteUser(id):
    usuario = Usuario.query.get(id)

    if not usuario:
        return jsonify({"erro":"Usuário não encontrado!"}), 404
    
    try:
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({"message": "Usuário deletado com sucesso!"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"erro": "Erro ao deletar o usuário!"}), 500


@app.route("/putUser/<int:id>", methods=["PUT"])
def update_user(id):
    dados = request.json
    novo_nome = dados.get("name")

    if not novo_nome:
        return jsonify({"erro": "O nome é obrigatório!"}), 400

    usuario = Usuario.query.get(id)
    
    if not usuario:
        return jsonify({"erro": "Usuário não encontrado!"}), 404

    usuario.nome = novo_nome

    try:
        db.session.commit()
        return jsonify({"message": "Usuário atualizado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500





if __name__ == '__main__':
    app.run(debug=True, port=3000)
