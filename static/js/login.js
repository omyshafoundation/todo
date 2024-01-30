members_name=document.getElementById("Users_name")
user_list=document.getElementById("Members_name_select_index")
atag=document.getElementById("url_for_auth")

function send_url(){
    url_auth="https://accounts.zoho.in/oauth/v2/auth?scope=zohopulse.tasks.READ,zohopulse.networklist.READ,zohopulse.userDetail.READ&client_id=1000.ODUSY4E3IEWXJD23RGZ5V6ZEVPLDGP&state="+user_list.value+"&response_type=code&redirect_uri=http://127.0.0.1/&access_type=offline"
    atag.href=url_auth;

}
async function fetchData() {
    try {
      const response = await fetch('/getdata1');
      const data = await response.json();
  
      json_data = data; // Assign the value to the variable
      console.log(json_data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  function index_page(){
  let Task_assignee_names_index=[];
  for(i=0;i<json_data.length;i++){
    Task_assignee_names_index[i]=json_data[i].Task_assignee;
  }
  Task_assignee_names_index = Array.from(new Set(Task_assignee_names_index))
  for(i=0;i<Task_assignee_names_index.length;i++){
    let option=document.createElement("option");
    option.innerHTML=Task_assignee_names_index[i];
    option.value=Task_assignee_names_index[i];
    members_name.appendChild(option)
  }
}
window.addEventListener("DOMContentLoaded", () => {
    (async () =>{
      try{
        await fetchData();
        index_page();
      }
      catch(error){
        console.log("error")
        console.log(error)
      }
    })();
   });
  