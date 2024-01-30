const listContainer = document.getElementById("list-container");
const todoappother= document.getElementById("todo_app_other_id");
const containerofothers=document.getElementById("containerforothers");
const members_name=document.getElementById("Members_name_select");
const h1container=document.getElementById("name_main_show");
const submitbutton=document.getElementById("SubmitButton");
const buttonBoard=document.getElementById("button_for_board");
const select_tag=document.getElementById("Select_tag");
const select_tag_main_user_board=document.getElementById("sort_for_main_user_by_board");
const container_main=document.getElementById("container-main")
const user_task_tab=document.getElementById("Tab_1")
const board_task_tab=document.getElementById("Tab_2")
const next_previous_tags=document.getElementById("next_previous")
const sort_by_board=document.getElementById("sort_by_board")
const base_url="https://connect.orionsquare.org/task/"
var The_var_stores_checked_tasks=The_var_stores_removed_tasks=JSON.parse(localStorage.getItem("The_var_stores_removed_tasks"));
var xyz=JSON.parse(localStorage.getItem("The_removed_task_index"));
var json_data;
var Task_assignee_names_all = [];
var Task_assignee_names = [];
var Task_board_id_all=[];
var Task_board_name_all=[];
var Task_Name_all=[];
var Task_priority_all=[];
var Task_assignee_board_multi=[];
var The_name;
var Task_board_name=[];
var Task_board_id=[];
var Tasks_name=[];
var Tasks_id=[];
var Tasks_id_int=[];
var Tasks_priority_id=[];
var Task_duedate_all=[];
var Task_startdate_all=[];
var Task_id_all=[];
var Task_id_url_all=[];
var Checked_Tasks_Array=[];
var Task_delete_checked_indicator=[]
var TaskDueType=[]


async function fetchData() {
  try {
    const response = await fetch('/getdata1');
    const data = await response.json();

    json_data = data; // Assign the value to the variable
    //console.log(json_data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// console.log("hello")
//console.log(json_data)


// function index_page(){
//   let Task_assignee_names_index=[];
//   for(i=0;i<json_data.length;i++){
//     Task_assignee_names_index[i]=json_data[i].Task_assignee;
//   }
//   Task_assignee_names_index = Array.from(new Set(Task_assignee_names_index))
//   for(i=0;i<Task_assignee_names_index.length;i++){
//     let option=document.createElement("option");
//     option.innerHTML=Task_assignee_names_index[i];
//     option.value=Task_assignee_names_index[i];
//     members_name.appendChild(option)
//   }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function date_convert(date){
  console.log(date.substr(3,3))
  console.log(date.length)
  console.log(date.slice(0,2))
  let real_date="";
  if(date.length!=11){
    date.concat(" ","2024")
  }
  if(date.substr(3,3)=="Jan"){
    real_date=date.substr(7,4)+"-"+"01"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Feb"){
    real_date=date.substr(7,4)+"-"+"02"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Mar"){
    real_date=date.substr(7,4)+"-"+"03"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Apr"){
    real_date=date.substr(7,4)+"-"+"04"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="May"){
    real_date=date.substr(7,4)+"-"+"05"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Jun"){
    real_date=date.substr(7,4)+"-"+"06"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Jul"){
    real_date=date.substr(7,4)+"-"+"07"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Aug"){
    real_date=date.substr(7,4)+"-"+"08"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Sep"){
    real_date=date.substr(7,4)+"-"+"09"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Oct"){
    real_date=date.substr(7,4)+"-"+"10"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Nov"){
    real_date=date.substr(7,4)+"-"+"11"+"-"+date.substr(0,2)
  }
  else  if(date.substr(3,3)=="Dec"){
    real_date=date.substr(7,4)+"-"+"12"+"-"+date.substr(0,2)
  }
  else{
    console.log("This is WRAAAANGGGG")
  }
  const dateObject = new Date(real_date);
  // console.log(dateObject)
  return dateObject
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function date_today(var1){
  const currentDate = new Date();
  console.log(currentDate)
  currentDate.setDate(currentDate.getDate() + var1);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  return formattedDate
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let index_previous=-1
function previousDay(){
  let date=date_today(index_previous--)
  const dateh3=document.getElementById("date_todo_main")
  dateh3.textContent=date
  index_next--
  Task_according_date(date)
}
let index_next=1
function nextDay(){
  let date=date_today(index_next++)
  const dateh3=document.getElementById("date_todo_main")
  dateh3.textContent=date
  index_previous++
  Task_according_date(date)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Every_day_task(){
  const toogle_check=document.getElementById("toggle_button_checklist");
  if(toogle_check.checked){
  //console.log("worked")
  let buttontag1=document.createElement("button");
  let buttontag2=document.createElement("button");
  let h3tag=document.createElement("h3")
  buttontag1.innerHTML="<";
  buttontag1.onclick=previousDay
  buttontag2.innerHTML=">";
  buttontag2.onclick=nextDay;
  h3tag.textContent=date_today(0);
  h3tag.id="date_todo_main";
  next_previous_tags.appendChild(buttontag1);
  next_previous_tags.appendChild(h3tag);
  next_previous_tags.appendChild(buttontag2);
  sort_by_board.innerHTML=''
  Task_according_date(date_today(0))
  ///date_convert(Task_assignee_board_multi[6][10])

}
else{
  next_previous_tags.innerHTML='';
  window.location.reload();
  tab_user_todo();
}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Task_according_date(date){
listContainer.innerHTML='';
date_formatted=date.substr(6,4)+"-"+date.substr(3,2)+"-"+date.substr(0,2)
date_obj=new Date(date_formatted);
console.log(date_obj)
for (i = 0; i < Task_assignee_board_multi[0].length; i++) {
  if(Task_assignee_board_multi[0][i]==User_Name_As_Main_User){
    if(date_convert(Task_assignee_board_multi[6][i])<date_obj){
      if(Task_assignee_board_multi[5][i]=="NoNe"){
        continue
      }
  let li = document.createElement("li");
  let ahref=document.createElement("a");
  let div0=document.createElement("div");
  div0.className='name_priority_container'
  ahref.href=base_url+Task_assignee_board_multi[8][i];
  ahref.target="_blank";
  ahref.innerHTML=Task_assignee_board_multi[3][i];
  li.id=Task_assignee_board_multi[7][i];
  if(Task_assignee_board_multi[9][i]=="1"){
    li.className="checked"
  }
  listContainer.appendChild(li);
  li.appendChild(div0);
  div0.appendChild(ahref)
  let h3tag = document.createElement("h3");
  let h3tag1=document.createElement("h3")
  let h3tag2=document.createElement("h3")
  let div=document.createElement("div");
  let div1=document.createElement("div");
  let div2=document.createElement("div")
  div.className='priority_container';
  div1.className='startdate_container'
  div2.className='duedate_container'
  if(Task_assignee_board_multi[4][i]=="0"){
    h3tag.textContent="none";
    div.style.backgroundColor="#216218";
    }
    else if(Task_assignee_board_multi[4][i]=="1"){
      h3tag.textContent="low"
      div.style.backgroundColor="#C9CC00";
    }
    else if(Task_assignee_board_multi[4][i]=="2"){
      h3tag.textContent="medium"
      div.style.backgroundColor="#F77F00";
    }
    else{
      h3tag.textContent="high"
      div.style.backgroundColor="#99140B";
    }
  li.appendChild(div)
  li.appendChild(div1)
  li.appendChild(div2)
  h3tag.style="color: #ffffff"
  h3tag1.textContent=Task_assignee_board_multi[6][i];
  h3tag2.textContent=Task_assignee_board_multi[5][i];
  h3tag2.style="color:black"
  h3tag1.style="color:black"
  div.appendChild(h3tag);
  div1.appendChild(h3tag1)
  div2.appendChild(h3tag2)
}
  }
}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Board_name_of_user(select,all){
  let Task_board_id_temp=[];
  let flag=0;
  select.innerHTML='';
  let select_options=document.createElement("option")
  if(all=="yes"){
  select_options.innerHTML="Sort By Board"
  select_options.value="0007"
  select_options.selected="TRUE"
  select.appendChild(select_options)
}
if(all=="no"){
  select_options.innerHTML="Select A Board"
  select_options.value="0007"
  select_options.selected="TRUE"
  select.appendChild(select_options)
}
  for(i=0;i<Task_assignee_board_multi[2].length;i++){
    flag=0;
     if(Task_assignee_board_multi[0][i]== User_Name_As_Main_User){
      for(j=0;j<Task_board_id_temp.length;j++){
        if(Task_board_id_temp[j]==Task_assignee_board_multi[1][i]){
          flag=1;
          break;
        }
      }
    if(flag==0){
    select_options=document.createElement("option");/////////////////////////////This is the selector for boardname////////////////////////////////////////
    select_options.innerHTML=Task_assignee_board_multi[2][i];
    select_options.value=Task_assignee_board_multi[1][i];
    //select_options.selected="true"
    Task_board_id_temp.push(Task_assignee_board_multi[1][i]);
    select.appendChild(select_options)

    }
     }
  }
  //console.log(select.value)
  //saveData();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkedTask_To_array(){
  for(i=0;i<Task_assignee_board_multi[0].length;i++){
    if(Task_assignee_board_multi[9][i]==1){
    Checked_Tasks_Array.push(Task_assignee_board_multi[7][i])
    console.log(Checked_Tasks_Array)
    fetch('/receive_array', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: Checked_Tasks_Array }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Response from Flask:', data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
  }}}
//   // localStorage.setItem("checked-tasks",JSON.stringify(Checked_Tasks_Array));

async function checkedTask_From_array(){
  try {
    const response = await fetch('/get_checked_tasks');
    const data = await response.json();

    checked_tasks = data; // Assign the value to the variable
    console.log(checked_tasks)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  checked_tasks = Array.from(new Set(checked_tasks));
  console.log(checked_tasks[0])
  for(i=0;i<Task_assignee_board_multi[7].length;i++){
    //console.log("loop i okay")
    for(j=0;j<checked_tasks.length;j++){
      if(Task_assignee_board_multi[7][i]==checked_tasks[j]){
        //console.log("loop j okay")
        Task_assignee_board_multi[9][i]=1;
      }
    }
  }
  console.log(Task_assignee_board_multi)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function runcode() {
//   let z=0;
//   //console.log(Task_assignee_names)
//   listContainer.innerHTML='';
//   for(i=0;i<json_data.length;i++){
//     Task_assignee_names_all[i]=json_data[i].Task_assignee;
//     Task_assignee_names[i]=json_data[i].Task_assignee;
//     Task_board_id_all[i]=json_data[i].Task_partition_id;
//     Task_board_name_all[i]=json_data[i].Task_partition_name;
//     Task_Name_all[i]=json_data[i].Task_name;
//     Task_priority_all[i]=json_data[i].Task_priority;
//     Task_assignee_board_multi=[Task_assignee_names_all,Task_board_id_all,Task_board_name_all,Task_Name_all,Task_priority_all];/////////used multidimensional array for all taskassignee and board/////////
//     if(Task_assignee_names[i]==members_name.value){
//       Tasks_name[z]=json_data[i].Task_name
//       Tasks_id[z]=json_data[i].Task_Id
//       Tasks_id_int[z]=BigInt(Tasks_id[z])
//       Tasks_id[z]=(Tasks_id_int[z]-BigInt("1")).toString()
//       Tasks_priority_id[z]=json_data[i].Task_priority
//       Task_board_id[z]=json_data[i].Task_partition_id;
//       Task_board_name[z]=json_data[i].Task_partition_name;
//       Task_duedate[z]=json_data[i].Task_duedate.substr(0,11);
//       Task_startdate[z]=json_data[i].Task_startdate.substr(0,11);
//       z=z+1;
      
//      }
// Task_assignee_names = Array.from(new Set(Task_assignee_names));
// Task_board_id= Array.from(new Set(Task_board_id))
// Task_board_name= Array.from(new Set(Task_board_name));
// listContainer.innerHTML=' ';
// //saveData();
// console.log(Task_board_name)
// Board_name_of_user(select_tag_main_user_board,"yes");
// Board_name_of_user(select_tag,"no")
// display_on_mainUser_todo();
// }
function tab_user_todo(){
  user_task_tab.className="active"
  board_task_tab.className="tablinks"
  MainFunction("0");
}
function tab_board_todo(){
  board_task_tab.className="active"
  user_task_tab.className="tablinks"
  listContainer.innerHTML="";
}
async function MainFunction(var1){
  listContainer.innerHTML='';
   if(var1=="0007"){
   runcode();
   await checkedTask_From_array()
   }
  else if(var1=="0"){
        Task_assignee_board_multi=JSON.parse(localStorage.getItem("Multi_array_main"))
        if(Task_assignee_board_multi==null){
          //console.log("idea workks")
          runcode();
        }
   }
   console.log(Task_assignee_board_multi)
  Board_name_of_user(select_tag_main_user_board,"yes");
  Board_name_of_user(select_tag,"no")
  console.log(select_tag_main_user_board.value)
  display_on_mainUser_todo(select_tag_main_user_board.value);
  // display_on_mainUser_todo();
  //alertSystem();
}
function alertSystem(){
  var alert_due_tasks=[]
  for(i=0;i<Task_assignee_board_multi[0].length;i++){
  if((Task_assignee_board_multi[10][i]=="isTodayDue")&&(Task_assignee_board_multi[0][i]==User_Name_As_Main_User)){
    alert_due_tasks.push(Task_assignee_board_multi[3][i]+"\n")
    //alert("working")
    console.log(alert_due_tasks)
  }
}
  if(!alert_due_tasks.length==0){
    Swal.fire("<h1><b><u>The Task having Duedate today</u></b></h1>"+"\n"+"<ul id='alert_system'></ul>")
    let alert_system=document.getElementById("alert_system")
    for(i=0;i<alert_due_tasks.length;i++){
    let lita=document.createElement("li")
    lita.innerHTML=alert_due_tasks[i]
    alert_system.appendChild(lita)
  }

  }
  // alertSystem()
}
function reset(){
  async function Reset_fetch_data() {
    try {
      const response = await fetch('/data_fetch');
      await fetchData();
      //location.reload();
      checkedTask_To_array();
      let var_for_reset="0007";
      MainFunction(var_for_reset);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  Reset_fetch_data();
  // location.reload();
}
// function SaveData(){
//   localStorage.setItem("The_var_stores_removed_tasks",JSON.stringify(The_var_stores_removed_tasks))
//   localStorage.setItem("The_removed_task_index",JSON.stringify(xyz))
//   console.log(localStorage.length)
// }
function runcode(){
  //console.log("runcode works")
  let z=0;
  let Task_id_int=[];
  listContainer.innerHTML='';
    for(i=0;i<json_data.length;i++){
      Task_assignee_names_all[i]=json_data[i].Task_assignee;
      Task_assignee_names[i]=json_data[i].Task_assignee;
      Task_board_id_all[i]=json_data[i].Task_partition_id;
      Task_board_name_all[i]=json_data[i].Task_partition_name;
      Task_Name_all[i]=json_data[i].Task_name;
      Task_priority_all[i]=json_data[i].Task_priority;
      Task_duedate_all[i]=json_data[i].Task_duedate.substr(0,11);
      Task_startdate_all[i]=json_data[i].Task_startdate.substr(0,11);
      if(Task_startdate_all[i].includes(',')){
        Task_startdate_all[i]=json_data[i].Task_startdate.substr(0,6);
        Task_startdate_all[i]=Task_startdate_all[i].concat(" ","2024")
        }
      // if((Task_startdate_all[i].includes('PM'))||(Task_startdate_all[i].includes('AM'))){
      //   console.log("hello")
      //     const date = new Date();
      //     date_string=stringify(date)
      //     console.log(date)
      //     Task_startdate_all=date_string.substr(8,2)+" "+date_string.substr(4,3)+" "+date_string.substr(11,4)
      //   }
      Task_id_all[i]=json_data[i].Task_Id
      Task_id_int[i]=BigInt(Task_id_all[i])
      Task_id_url_all[i]=(Task_id_int[i]-BigInt("1")).toString()
      Task_delete_checked_indicator[i]=0;
      TaskDueType[i]=json_data[i].Task_due_type
      Task_assignee_board_multi=[Task_assignee_names_all,Task_board_id_all,Task_board_name_all,Task_Name_all,Task_priority_all,Task_duedate_all,Task_startdate_all,Task_id_all,Task_id_url_all,Task_delete_checked_indicator,TaskDueType];/////////used multidimensional array for all taskassignee and board/////////
    }
    console.log(Task_assignee_board_multi)
    // try{
    // checkedTask_From_array()}
    // catch(e){
    //   console.log("first_load")
    // }
    // Board_name_of_user(select_tag_main_user_board,"yes");
    // Board_name_of_user(select_tag,"no")
    // display_on_mainUser_todo(select_tag_main_user_board.value);
    //saveData();
  }
  function sort_main_user_board(){
    listContainer.innerHTML='';
    display_on_mainUser_todo(select_tag_main_user_board.value)
  }
// function sort_main_user_board(){
//   listContainer.innerHTML=''
//   let z=0;
//   console.log(Task_assignee_names)
//   console.log(select_tag_main_user_board.value)
//   console.log(Task_board_id_all)
//   Tasks_name.length=0;
//   for(i=0;i<json_data.length;i++){
//     if((select_tag_main_user_board.value=="0007")&&(Task_assignee_names_all[i]==members_name.value)){
//       Tasks_name[z]=json_data[i].Task_name
//       Tasks_id[z]=json_data[i].Task_Id
//       Tasks_id_int[z]=BigInt(Tasks_id[z])
//       Tasks_id[z]=(Tasks_id_int[z]-BigInt("1")).toString()
//       Tasks_priority_id[z]=json_data[i].Task_priority
//       Task_board_id[z]=json_data[i].Task_partition_id;
//       Task_board_name[z]=json_data[i].Task_partition_name;
//       Task_duedate[z]=json_data[i].Task_duedate.substr(0,11);
//       Task_startdate[z]=json_data[i].Task_startdate.substr(0,11);
//       z=z+1;
//     }
//     if(Task_assignee_names_all[i]==members_name.value){
//     if(select_tag_main_user_board.value==Task_board_id_all[i]){
//       Tasks_name[z]=json_data[i].Task_name
//       Tasks_id[z]=json_data[i].Task_Id
//       Tasks_id_int[z]=BigInt(Tasks_id[z])
//       Tasks_id[z]=(Tasks_id_int[z]-BigInt("1")).toString()
//       Tasks_priority_id[z]=json_data[i].Task_priority
//       Task_board_id[z]=json_data[i].Task_partition_id;
//       Task_board_name[z]=json_data[i].Task_partition_name;
//       Task_duedate[z]=json_data[i].Task_duedate.substr(0,11);
//       Task_startdate[z]=json_data[i].Task_startdate.substr(0,11);
//       z=z+1;
//     }
//      }
//   }
//   display_on_mainUser_todo()
// }
  ///////////////////////////////////////////////Collected the assignees name and also their task names,id,priority////////////////////////////////////////////
function display_on_mainUser_todo(var_1){
  //submitbutton.disabled = true;
  //members_name.disabled=true;
  //console.log(members_name.value)
  let priority_none_count=[]
  let h1tagforname=document.createElement("h1")
  h1container.innerHTML='';
  h1tagforname.textContent= User_Name_As_Main_User;
  h1container.appendChild(h1tagforname)
  //saveData();

  for (i = 0; i < Task_assignee_board_multi[0].length; i++) {
    if((Task_assignee_board_multi[0][i]==User_Name_As_Main_User)&&((var_1=="0007")||(var_1==Task_assignee_board_multi[1][i]))){
    let li = document.createElement("li");
    let ahref=document.createElement("a");
    let div0=document.createElement("div");
    div0.className='name_priority_container'
    ahref.href=base_url+Task_assignee_board_multi[8][i];
    ahref.target="_blank";
    ahref.innerHTML=Task_assignee_board_multi[3][i];
    li.id=Task_assignee_board_multi[7][i];
    if(Task_assignee_board_multi[9][i]=="1"){
      li.className="checked"
    }
    listContainer.appendChild(li);
    li.appendChild(div0);
    div0.appendChild(ahref)
    let h3tag = document.createElement("h3");
    let h3tag1=document.createElement("h3")
    let h3tag2=document.createElement("h3")
    let div=document.createElement("div");
    let div1=document.createElement("div");
    let div2=document.createElement("div")
    div.className='priority_container';
    div1.className='startdate_container'
    div2.className='duedate_container'

    if(Task_assignee_board_multi[4][i]=="0"){
    h3tag.textContent="none";
    div.style.backgroundColor="#216218";
    priority_none_count.push(Task_assignee_board_multi[3][i])
    }
    else if(Task_assignee_board_multi[4][i]=="1"){
      h3tag.textContent="low"
      div.style.backgroundColor="#C9CC00";
    }
    else if(Task_assignee_board_multi[4][i]=="2"){
      h3tag.textContent="medium"
      div.style.backgroundColor="#F77F00";
    }
    else{
      h3tag.textContent="high"
      div.style.backgroundColor="#99140B";
    }
    li.appendChild(div)
    li.appendChild(div1)
    li.appendChild(div2)
    h3tag.style="color: #ffffff"
    h3tag1.textContent=Task_assignee_board_multi[6][i];
    h3tag2.textContent=Task_assignee_board_multi[5][i];
        if(Task_assignee_board_multi[10][i]=="Not Assigned"){
          h3tag2.style="color:#216218"
        }
        else if(Task_assignee_board_multi[10][i]=="isUpcomingDue"){
          h3tag2.style="color:#C9CC00"
        }
        else if(Task_assignee_board_multi[10][i]=="isTodayDue"){
          h3tag2.style="color:#F77F00"
        }
        else if(Task_assignee_board_multi[10][i]=="isOverDue"){
          h3tag2.style="color:#99140B"
        }
    h3tag1.style="color:black"
    div.appendChild(h3tag);
    div1.appendChild(h3tag1)
    div2.appendChild(h3tag2)
    // let span = document.createElement("span");
    // span.innerHTML = "\u00d7";
    // li.appendChild(span);
    saveData();
  }
  }  //////////////////////////////////////////The todo of the main user is being created and modified using above code//////////////////////////////////////////
  //containerofothers.innerHTML='';
  //todoappother.innerHTML='';
  //console.log(Task_board_name)
  //Board_name_of_user(select_tag);
  priority_alert_system(priority_none_count)
   }
function priority_alert_system(priority_none_count){
  if(!priority_none_count.length==0){
    console.log("hellooo")
    Swal.fire("<h1><b><u>The Task having no priority</u></b></h1>"+"\n"+"<ul id='alert_system'></ul>").then((result) => {
      if (result.isConfirmed) {
        console.log("workkdd oky")
        alertSystem()
        // Perform actions you want to execute after the user clicks OK
      } 
    })
    let alert_system=document.getElementById("alert_system")
    for(i=0;i<priority_none_count.length;i++){
    let lita=document.createElement("li")
    lita.innerHTML=priority_none_count[i]
    alert_system.appendChild(lita)
  }

  }
}
function create_new_task(){
  Swal.fire("<h1>The Priority Of Tasks Should Not Be None</h1>"+"\n"+"<ul id='alert_system'></ul>").then((result) => {
    if (result.isConfirmed) {
      window.open("https://connect.orionsquare.org/alltasks","_blank")
      // Perform actions you want to execute after the user clicks OK
    } 
  })
}
////////////////////////////////////////////////////////////////////////////////////////////////////    
function Task_of_other_members(){
  containerofothers.innerHTML='';
  todoappother.innerHTML='';
  z=0;
  Task_assignee_names.length=0;
  //console.log(select_tag.value)
  let selected_board=select_tag.value
  console.log(Task_assignee_board_multi)
  for(i=0;i<Task_assignee_board_multi[0].length;i++){
    if(Task_assignee_board_multi[1][i]==selected_board){
      Task_assignee_names[z]=Task_assignee_board_multi[0][i];
      z++;
    }
  }
  Task_assignee_names = Array.from(new Set(Task_assignee_names))
  console.log(Task_assignee_board_multi)
  for(i=0;i<Task_assignee_names.length;i++){
    let h1tag=document.createElement("h1");
    let ultag=document.createElement("ul");
    let h3tag1=document.createElement("h3");
    let divtag_task_priority=document.createElement("div")
    divtag_task_priority.className="Task_priority_tag_others";
    h3tag1.textContent="Tasks";
    let h3tag2=document.createElement("h3");
    h3tag2.textContent="Priority";
    h1tag.textContent=Task_assignee_names[i];
    var clonedSection = todoappother.cloneNode(true);
    containerofothers.appendChild(clonedSection);
    h1tag.textContent=Task_assignee_names[i];
    clonedSection.appendChild(h1tag);
    clonedSection.appendChild(divtag_task_priority);
    clonedSection.appendChild(ultag)
    divtag_task_priority.appendChild(h3tag1);
    divtag_task_priority.appendChild(h3tag2);
    for(j=0;j<Task_assignee_board_multi[0].length;j++){
      if(Task_assignee_names[i]==Task_assignee_board_multi[0][j]){
        if(selected_board==Task_assignee_board_multi[1][j]){
        let litag=document.createElement("li")
        let divtag=document.createElement("div")
        let divtag_task_h4=document.createElement("div")
        let h4tag=document.createElement("h4");
        divtag.className="priority_container_others"
        divtag_task_h4.className="others_task_name_h4"
        let h3tag_other=document.createElement("h3");
        h4tag.textContent=Task_assignee_board_multi[3][j];
        if(Task_assignee_board_multi[9][j]==1){
          litag.style.textDecoration="line-through"
        }
        ultag.appendChild(litag)
        litag.appendChild(divtag_task_h4)
        divtag_task_h4.appendChild(h4tag)
        if(Task_assignee_board_multi[4][j]=="0"){
          h3tag_other.textContent="none";
          divtag.style.backgroundColor="green";
          }
          else if(Task_assignee_board_multi[4][j]=="1"){
            h3tag_other.textContent="low"
            divtag.style.backgroundColor="yellow";
          }
          else if(Task_assignee_board_multi[4][j]=="2"){
            h3tag_other.textContent="medium"
            divtag.style.backgroundColor="orange";
          }
          else{
            h3tag_other.textContent="high"
            divtag.style.backgroundColor="red";
          }
        litag.appendChild(divtag)
        divtag.appendChild(h3tag_other)
        saveData();
        }
      }

    }
      }
}
var zyx=1;
var check_flag=0;
var The_var_store_checked_index=[];
var even=0;
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      console.log(e.target.id)
      check_flag=0;
    //   for(k=7;k<The_var_store_checked_index.length;k=k+9){
    //     var timer=k-7;
    //     if(The_var_stores_checked_tasks[k]==e.target.id){
    //       console.log("hai")
    //        for(v=0;v<9;v++){
    //          //console.log("hello")
    //         //  console.log(The_var_stores_checked_tasks[2][0])
    //          Task_assignee_board_multi[v].splice(The_var_store_checked_index[timer],0,The_var_stores_checked_tasks[timer][0])
    //          //The_var_store_checked_index.splice(timer,1)
    //          timer=timer+1;
    //        }
    //        The_var_stores_checked_tasks.splice(k-7,9);
    //        check_flag=1;
    //    }
    //  }if(check_flag!=1){
      for(i=0;i<Task_assignee_board_multi[7].length;i++){
        if((Task_assignee_board_multi[9][i]==1)&&(e.target.id==Task_assignee_board_multi[7][i])){
          //console.log("hai")
        //The_var_stores_checked_tasks.splice(i,1);
        Task_assignee_board_multi[9][i]=0;
        check_flag=1;
        zyx--
        //continue
        }
    }
      if(check_flag==0){
      for(i=0;i<Task_assignee_board_multi[7].length;i++){
        if(e.target.id==Task_assignee_board_multi[7][i]){
          //console.log("hello")
            //The_var_stores_checked_tasks[zyx]=Task_assignee_board_multi[7][i];
            //Task_assignee_board_multi[j].splice(i,0,The_var_stores_checked_tasks[j])
            //The_var_store_checked_index[even++]=i
            //zyx++;
            Task_assignee_board_multi[9][i]=1;
            console.log("worked")
      }
    }
    console.log(Task_assignee_board_multi)
  }      saveData();
  ////localStorage.setItem("The_var_stores_checked_tasks",JSON.stringify(The_var_stores_checked_tasks));
  //localStorage.setItem("The_index_for_checked",JSON.stringify(zyx));

    //The_var_stores_checked_tasks = Array.from(new Set(The_var_stores_checked_tasks));

     } //else if (e.target.tagName === "SPAN") {
      //The_var_stores_removed_tasks=JSON.parse(localStorage.getItem("The_var_stores_removed_tasks"))
      //xyz=JSON.parse(localStorage.getItem("The_removed_task_index"))
      // e.target.parentElement.remove();
      // console.log(e.target.parentElement.value)
    //   console.log(Task_assignee_board_multi)
    //   for(i=0;i<Task_assignee_board_multi[7].length;i++){
    //     if(e.target.parentElement.id==Task_assignee_board_multi[7][i]){
    //       for(j=0;j<9;j++){
           
    //         The_var_stores_removed_tasks[xyz]= Task_assignee_board_multi[j].splice(i,1);
    //   }
    //   xyz++;
    // }
    //   }
    // for(i=0;i<Task_assignee_board_multi[7].length;i++){
    //       if(e.target.parentElement.id==Task_assignee_board_multi[7][i]){
    //         Task_assignee_board_multi[9][i]=1;
    //   }
    //     }
    //   The_var_stores_removed_tasks= Array.from(new Set(The_var_stores_removed_tasks));
    //    console.log(The_var_stores_removed_tasks)
      // console.log(Task_assignee_board_multi)
    //   saveData();
    // }
  },
  false
);
function saveData() {
  //localStorage.setItem("data", listContainer.innerHTML);
  //localStorage.setItem("name",h1container.innerHTML);
  //localStorage.setItem("board_name_others",select_tag.innerHTML);
  //localStorage.setItem("container_main",container_main)
  //localStorage.setItem("The_var_stores_removed_tasks",JSON.stringify(The_var_stores_removed_tasks))
  //localStorage.setItem("The_removed_task_index",JSON.stringify(xyz))
  //The_var_stores_checked_tasks=JSON.parse(localStorage.getItem("The_var_stores_checked_tasks"));
  localStorage.setItem("Multi_array_main",JSON.stringify(Task_assignee_board_multi))
}
function showTask() {
  //listContainer.innerHTML = localStorage.getItem("data");
  //h1container.innerHTML=localStorage.getItem("name");
  //select_tag.innerHTML=localStorage.getItem("board_name_others")
  //container_main.innerHTML=localStorage.getItem("container_main")
  //The_var_stores_removed_tasks=JSON.parse(localStorage.getItem("The_var_stores_removed_tasks"))
  //The_var_stores_checked_tasks=JSON.parse(localStorage.getItem("The_var_stores_checked_tasks"));
}
//showTask();
 window.addEventListener("DOMContentLoaded", () => {
  (async () =>{
    try{
      await fetchData();
      //listContainer.innerHTML='';
      //h1container.innerHTML='';
      //console.log(json_data);
      //index_page();
      //let var_to_pass="0"
      //MainFunction(var_to_pass);
      tab_user_todo()
      //MainFunction();
      //showTask();
      //runcode();
      //runcode();
      //Board_name_of_user();
    }
    catch(error){
      console.log("error")
      console.log(error)
    }
  })();
 });
