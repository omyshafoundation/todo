import requests,json
import uuid
from flask import Flask, render_template,request,session,redirect,jsonify
app = Flask(__name__,static_url_path='/static')
app.secret_key = 'your_secret_key'
    # Your Zoho Connect API credentials
client_id = "1000.0QO7QP358JPJDRZMY1P1MY0SZ6H1KV"
client_secret = "fe2109a5da9d16d05cdff85e15082660aeb480ee8d"
# email = "/austinsabu0007@gmail.com"
# workspace = "/Employee"
# reports = "/manhunter"
# URL for obtaining an access token
token_url = "https://accounts.zoho.in/oauth/v2/token"
# reports_url = "https://analyticsapi.zoho.in/api"
# reports_idfier = email+workspace+reports
task_url = "https://connect.zoho.in/pulse/nativeapi/allTasks"
# test ={
#         "Task_name":"test",
#         "Task_priority":"test",
#         "Task_assignee":"test"
# }
authorization="false"
###################################################################################
@app.route('/login')
def login():
    #print(request.form.get(data))
    session['authorization']="false"
    clientid= "1000.K2L49TSR5GUP9ILDKU7SP0ZTD1F8NB"
    clientsecret="f59248e318fb1c7fb45ee5c328e30105883f6f0ee3"
    url_auth="https://accounts.zoho.in/oauth/v2/auth?scope=zohopulse.tasks.READ,zohopulse.networklist.READ&client_id=1000.ODUSY4E3IEWXJD23RGZ5V6ZEVPLDGP&state="
    url_auth2="&response_type=code&redirect_uri=http://127.0.0.1/&access_type=offline"
    return render_template("login.html" , url_auth=url_auth,url_auth2=url_auth2)
###################################################################################
@app.route('/logout')
def logout():
     if request.method=='GET':
        session.pop('authorization',None)
        session.pop('user_name',None)
        session.pop('Access_token',None)
        session.pop('Refresh_token',None)
        return redirect('/login')
@app.route('/')
def hello():
        session['auth_code']=request.args.get('code')
        session['auth_state']=request.args.get('state')
        return redirect('/access_token_required')
@app.route('/one')
def testing():
        if(session['authorization']=="false"):
             return redirect('/login')
        else:
            return render_template("index1.html")
@app.route('/access_token_required')
def get_access_token():
        auth_code=session['auth_code']
        auth_state=session['auth_state']
        session['user_name']=auth_state
        print(auth_code)
        clientid= "1000.ODUSY4E3IEWXJD23RGZ5V6ZEVPLDGP"
        clientsecret="bfd5c55f13019201f88848c2d361dae5b78046b4be"
        data = {
                "code": auth_code,
                "client_id": clientid,
                "client_secret": clientsecret,
                "redirect_uri":"http://127.0.0.1/",
                "grant_type": "authorization_code",
                "scope":"zohopulse.tasks.READ",
                "state":auth_state
            }

        response = requests.post(token_url, data=data)
        session['Access_token']=response.json().get('access_token')
        session['Refresh_token']=response.json().get('refresh_token')
        # with open("The_user_session","w") as file:
        #      file.write(auth_state)
        # data_fetch_function()
        return redirect('/data_fetch')
@app.route('/authentication_using_id_and_name')
def authenticator():
    auth_code=session['auth_code']
    auth_state=session['auth_state']
    session['user_name']=auth_state
    print(auth_code)
    clientid= "1000.ODUSY4E3IEWXJD23RGZ5V6ZEVPLDGP"
    clientsecret="bfd5c55f13019201f88848c2d361dae5b78046b4be"
    data = {
                "code": auth_code,
                "client_id": clientid,
                "client_secret": clientsecret,
                "redirect_uri":"http://127.0.0.1/",
                "grant_type":"authorization_code",
                "scope":"zohopulse.userDetail.READ",
                "state":auth_state
        }

    response = requests.post(token_url, data=data)
    access_token=response.json().get('access_token')
    payload={"scopeID":34903000000002003}
    headers = {
            'Authorization': 'Bearer '+access_token
            }
    response = requests.request("POST","https://www.zoho.com/connect/api/v1/users/me",headers=headers)
    return response.json()
    return fetch_name(access_token)
@app.route('/data_fetch')
def data_fetch_function():
    try:
        task_name_for_pass=[]
        data_todo=[]
        access_token=session['Access_token']
        refresh_token=session['Refresh_token']
        print(access_token)
        def fetch_tasks():
            payload={"scopeID":34903000000002003,
                    "limit":100000}
            headers = {
            'Authorization': 'Zoho-oauthtoken '+access_token
            }
            response = requests.request("POST",task_url,headers=headers,data=payload)
            return response.json()
        datas=fetch_tasks()
        # datas=fetch_tasks("1000.643e36c047d524f55f520a63b86669e8.a345d8350e1bdaf892e3cbb0caffb29a")
        due_condition_check=["isUpcomingDue","isTodayDue","isOverDue"]
        for task in datas['allTasks']['tasks']:
            title = task.get('title', [{}])[0].get('text', 'Title not found')
            task_id=task['id']
            priority_id= task['taskPriority']['id']
            priority_name= task['taskPriority']['name']
            boardid=task['partition']['id']
            boardname=task['partition']['name']
            startdate=task['formattedCreatedTime']
            try:
                duedate=task['formattedDueDateTime']
            except:
                duedate="NoNe"
            assignee_no=0
            condi=0
            try:
                    if(task[due_condition_check[condi]]=="true"):
                        duedate_type=due_condition_check[condi]
            except:
                condi=condi+1
                try:
                    if(task[due_condition_check[condi]]=="true"):
                        duedate_type=due_condition_check[condi]
                except:
                    condi=condi+1
                    try:
                        if(task[due_condition_check[condi]]=="true"):
                            duedate_type=due_condition_check[condi]
                    except:
                        duedate_type="Not Assigned"

            #print("Title:", title)
            #print("priority: ",priority_id," ",priority_name)
            try:
                assignee_no= int(task['assigneesCount'])
                try:
                    for x in range(assignee_no):
                            assignees = task['assignees'][x]['name']
                            assignees_id=task['assignees'][x]['id']
                            #print("assignee: " ,assignees)
                            zoop = {
                                "Task_name":title,
                                "Task_Id":task_id,
                                "Task_priority":priority_id,
                                "Task_assignee":assignees,
                                "Task_assignee_id":assignees_id,
                                "Task_due_type":duedate_type,
                                "Task_partition_id":boardid,
                                "Task_partition_name":boardname,
                                "Task_duedate":duedate,
                                "Task_startdate":startdate
                            }
                            print(zoop)
                            data_todo.append(zoop)
                            data_todo_need =json.dumps(data_todo,indent=4)
                except:
                    print("assignees: no assignee")           
            except:
                    print("assignees:no assignee") 
        data_todo_need_json=json.loads(data_todo_need) 
        with open("input.json","w") as file1:
            file1.write(data_todo_need)  

    except:
        return redirect('/login')
    else:
        with open("The_api_from_zoho.json","w") as fileapi:
            fileapi.write(data_todo_need)
        session['authorization']="true"
        return redirect('/one')
###################################################################################
@app.route('/getdata1')
def showdata():
    with open("The_api_from_zoho.json","r") as file1:
        file=file1.read()
    print(file)
    filejson=json.loads(file)
    #print(filejson)
    return(filejson) 
#######################################################################################################
@app.route('/receive_array', methods=['POST'])
def receive_array():
    data_from_js = request.json.get('data')  # Assuming JSON data is sent from JavaScript
    # Process the array data here
    result = {'message': 'Array received successfully'}
    try:
        with open('The_checked_task.json', 'a') as file:
            for item in data_from_js:
                 file.write(str(item)  +',')
        result = {'message': 'Data written to file successfully'}
    except Exception as e:
        print(f"Error: {str(e)}")
        result = {'error': 'Internal Server Error'}
    return jsonify(result)
#######################################################################################################
@app.route('/get_checked_tasks', methods=['GET'])
def get_data():
    with open("The_checked_task.json","r") as file:
         data=file.read()
    array_data = data.split(',')

    data_json=json.dumps(array_data)
    data_json_load=json.loads(data_json)
    return data_json_load
#######################################################################################################
if __name__ == '__main__':
     app.run(debug=True,host='127.0.0.1',port=80)


# @app.route('/api')
# def fetch():
#     clientid= "1000.K2L49TSR5GUP9ILDKU7SP0ZTD1F8NB"
#     clientsecret="f59248e318fb1c7fb45ee5c328e30105883f6f0ee3"
#     task_name_for_pass=[]
#     data_todo=[]
    # def get_access_token():
    #     code = input("Enter the authorization code: ")

    #     data = {
    #         "code": code,
    #         "client_id": clientid,
    #         "client_secret": clientsecret,
    #         "redirect_uri":"http://127.0.0.1/",
    #         "grant_type": "authorization_code",
    #         "scope":"zohopulse.tasks.READ",
    #         "state":"zzz"
    #     }

    #     response = requests.post(token_url, data=data)
    #     Access_token=response.json().get('access_token')
    #     Refresh_token=response.json().get('refresh_token')
    #     print(Access_token+"    "+Refresh_token)
    #     return Access_token, Refresh_token
    
    # def fetch_tasks(access_token):
    #     payload={"scopeID":34903000000002003,
    #              "limit":100000}
    #     headers = {
    #     'Authorization': 'Zoho-oauthtoken '+access_token,
    #     }
    #     response = requests.request("POST",task_url,headers=headers,data=payload)
    #     return response.json()
    # #access_token=get_access_token()
    # datas=fetch_tasks("1000.643e36c047d524f55f520a63b86669e8.a345d8350e1bdaf892e3cbb0caffb29a")
    # due_condition_check=["isUpcomingDue","isTodayDue","isOverDue"]
    # for task in datas['allTasks']['tasks']:
    #     title = task['title'][0]['text']
    #     task_id=task['id']
    #     priority_id= task['taskPriority']['id']
    #     priority_name= task['taskPriority']['name']
    #     boardid=task['partition']['id']
    #     boardname=task['partition']['name']
    #     startdate=task['formattedCreatedTime']
    #     try:
    #         duedate=task['formattedDueDateTime']
    #     except:
    #          duedate="NoNe"
    #     assignee_no=0
    #     condi=0
    #     try:
    #             if(task[due_condition_check[condi]]=="true"):
    #                 duedate_type=due_condition_check[condi]
    #     except:
    #         condi=condi+1
    #         try:
    #             if(task[due_condition_check[condi]]=="true"):
    #                 duedate_type=due_condition_check[condi]
    #         except:
    #             condi=condi+1
    #             try:
    #                 if(task[due_condition_check[condi]]=="true"):
    #                      duedate_type=due_condition_check[condi]
    #             except:
    #                 duedate_type="Not Assigned"

    #     #print("Title:", title)
    #     #print("priority: ",priority_id," ",priority_name)
    #     try:
    #         assignee_no= int(task['assigneesCount'])
    #         try:
    #             for x in range(assignee_no):
    #                     assignees = task['assignees'][x]['name']
    #                     #print("assignee: " ,assignees)
    #                     zoop = {
    #                          "Task_name":title,
    #                          "Task_Id":task_id,
    #                          "Task_priority":priority_id,
    #                          "Task_assignee":assignees,
    #                          "Task_due_type":duedate_type,
    #                          "Task_partition_id":boardid,
    #                          "Task_partition_name":boardname,
    #                          "Task_duedate":duedate,
    #                          "Task_startdate":startdate
    #                     }
    #                     print(zoop)
    #                     data_todo.append(zoop)
    #                     data_todo_need =json.dumps(data_todo,indent=4)
    #         except:
    #              print("assignees: no assignee")           
    #     except:
    #             print("assignees:no assignee") 
    # data_todo_need_json=json.loads(data_todo_need) 
    # with open("input.json","w") as file1:
    #      file1.write(data_todo_need)   
    # for task in data_todo_need_json:
    #       if(task["Task_assignee"]=="AUSTIN SABU"):
    #         print(task["Task_name"])
    #         task_name_for_pass.append(task["Task_name"])
    #         print(task_name_for_pass)
    # return render_template('index1.html')
