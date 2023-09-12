import sqlite3 as sql
import sqlite3
import MailModule



class SQLiteCtrl():
    def initBuyerListTable(self):
        result = ""
        try:
            conn = sqlite3.connect('database.db')
            print("Opened database successfully")
            conn.execute(
                'CREATE TABLE buyer_list (name TEXT, phone TEXT UNIQUE, email TEXT, walletAddress TEXT, Isminted BOOLEAN NOT NULL)')
            print("Table created successfully")
            result = "Table created successfully"
            conn.close()
        except Exception as e:
            result = e
        finally:
            return result

    def dropTable(self, table):
        result = ""
        try:
            conn = sqlite3.connect('database.db')
            print("Opened database successfully")
            conn.execute(f'DROP TABLE {table}')
            print(f"drop table {table} successfully")
            result = f"drop table {table} successfully"
            conn.close()
        except Exception as e:
            result = e
        finally:
            return result

    def selectParticipants(self):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()
        cursor.execute('SELECT * FROM buyer_list ')
        data = cursor.fetchall()
        print(data)
        connect.close()
        return f"{data}"
    
    def select_buyer_mint(self):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()
        cursor.execute('SELECT json_group_array(json_object(\'Name\', name, \'Phone\', phone,\'Email\', email,\'WalletAddress\', walletAddress)) FROM buyer_list WHERE walletAddress IS NOT NULL AND Isminted == "False"')
        data = cursor.fetchone()[0]
        print(type(data))
        print(data)
        connect.close()
        return f"{data}"
    
    # Python3 code to convert a tuple
    # into a string using a for loop
    
    
    def convertTuple(self, tup):
            # initialize an empty string
        str = ''
        for item in tup:
            str = str + item
        return str
    
    
    
    
    def select_mailer_imformation(self, phone):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()
        sql_select_query = f'SELECT email FROM buyer_list WHERE phone = "{phone}"'
        cursor.execute(sql_select_query)
        data = cursor.fetchone()
        print(type(data))
        print(self.convertTuple(data))
        connect.close()
        return self.convertTuple(data)



    def update_buyer_mint(self, phone, entokenid):
        print(phone)
        print(entokenid)
        
        result = ""
        try:
            with sql.connect("database.db") as connect:
                cursor = connect.cursor()
                sql_update_query = f'UPDATE buyer_list SET Isminted = "true" WHERE phone = "{phone}"'
                # print(sql_update_query)
                cursor.execute(sql_update_query)
                connect.commit()
                msg = "Record successfully UPDATE"
                
                MailModule.MailModule.send(self.select_mailer_imformation(phone), entokenid)
                print(msg)
                result = msg
        except Exception as e:
            connect.rollback()
            msg = "error in UPDATE operation"
            print(msg)
            print(e)
            result = e
        finally:
            connect.close()
            return result

        # msg = "Record successfully added"
        # print(msg)
        # result = msg
        # connect.close()
        # return result




    def insertData(self, table="", **datas):
        columns = ""
        values = ""
        for arg in datas.items():
            print(arg)
            columns += arg[0] + ","
            values += "'"+arg[1] + "',"
        columns = columns[:-1]
        values = values[:-1]

        command = f"INSERT INTO {table} ({columns}) VALUES ({values})"
        print (command)

        result = ""
        try:
            with sql.connect("database.db") as con:
                cur = con.cursor()
                cur.execute(command)
                con.commit()
                msg = "buy successfully"
                print(msg)
                result = msg
        except Exception as e:

            con.rollback()
            msg = "error in buy operation"
            print(msg)
            print(e)
            result = e
        finally:
            con.close()
            return result
