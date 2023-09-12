from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from DBModule import SQLiteCtrl
import json

app = Flask(__name__)

CORS(app)

sql = SQLiteCtrl()


@app.route("/")
def hello_world():
    return render_template("db_page.html")


@app.route("/buyer_mint")
def buyer_mint():
    # return "<p>123</p>"
    return jsonify(results=json.loads(sql.select_buyer_mint()))


@app.route("/buy_url", methods=['POST'])
def buy_url():
    if request.method == 'POST':
        name = request.get_json()['name']
        phone = request.get_json()['phone']
        email = request.get_json()['email']
        walletAddress = request.get_json()['walletAddress']

        result = sql.insertData(table="buyer_list", name=name, phone=phone,
                               email=email, walletAddress=walletAddress, Isminted="False")
        return result
        # return '', 204
        # return f"<h1>name  : {name}</h1>\
        #         <h1>phone : {phone}</h1>\
        #         <h1>email : {email}</h1>\
        #         <h1>walletAddress : {walletAddress}</h1>\
        #         <h1>result : {result}</h1>"


@app.route("/minted", methods=['POST'])
def minted():
    if request.method == 'POST':
        print(request.get_json())
        print(request.get_json()['phone'])
        phone = request.get_json()['phone']
        entokenid = request.get_json()['entokenid']
        result = sql.update_buyer_mint(phone=phone, entokenid=entokenid)
     
    # return '', 204
    return result



@app.route('/participants')
def participants():
    return sql.selectParticipants()


@app.route('/init')
def init():
    return render_template("db_page.html", result=sql.initBuyerListTable())


@app.route('/drop')
def drop_table():
    return render_template("db_page.html", result=sql.dropTable("buyer_list"))


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000)
