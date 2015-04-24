function MenuChoice()
{
    switch (document.getElementById("menu").value)
    {
        case "Please select an option":
            document.getElementById("viewcategories").style.visibility = "hidden";
            document.getElementById("addproduct").style.visibility = "hidden";
            document.getElementById("changedescription").style.visibility = "hidden";
            document.getElementById("deletecategory").style.visibility = "hidden";
            document.getElementById("aboutme").style.visibility = "hidden";
            break;
        case "View Categories":
            document.getElementById("viewcategories").style.visibility = "visible";
            document.getElementById("addproduct").style.visibility = "hidden";
            document.getElementById("changedescription").style.visibility = "hidden";
            document.getElementById("deletecategory").style.visibility = "hidden";
            document.getElementById("aboutme").style.visibility = "hidden";
            break;
        case "Add Product Category":
            document.getElementById("viewcategories").style.visibility = "hidden";
            document.getElementById("addproduct").style.visibility = "visible";
            document.getElementById("changedescription").style.visibility = "hidden";
            document.getElementById("deletecategory").style.visibility = "hidden";
            document.getElementById("aboutme").style.visibility = "hidden";
            break;
        case "Change Category Description":
            document.getElementById("viewcategories").style.visibility = "hidden";
            document.getElementById("addproduct").style.visibility = "hidden";
            document.getElementById("changedescription").style.visibility = "visible";
            document.getElementById("deletecategory").style.visibility = "hidden";
            document.getElementById("aboutme").style.visibility = "hidden";
            break;
        case "Delete Category":
            document.getElementById("viewcategories").style.visibility = "hidden";
            document.getElementById("addproduct").style.visibility = "hidden";
            document.getElementById("changedescription").style.visibility = "hidden";
            document.getElementById("deletecategory").style.visibility = "visible";
            document.getElementById("aboutme").style.visibility = "hidden";
            break;
        case "About Me":
            document.getElementById("viewcategories").style.visibility = "hidden";
            document.getElementById("addproduct").style.visibility = "hidden";
            document.getElementById("changedescription").style.visibility = "hidden";
            document.getElementById("deletecategory").style.visibility = "hidden";
            document.getElementById("aboutme").style.visibility = "visible";
            break;
    }
}

function ViewCategories()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status ==200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateCategoriesOutput(output);
        }
    }
    
    objRequest.open("Get",url,true);
    objRequest.send();
}
function GenerateCategoriesOutput(result)
{
    var count = 0;
    var categoriestable = '<table id="categoriestable" border=1pt solid black><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>';
    
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        categoriestable += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>"
        + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    
    categoriestable += "</table>";
    document.getElementById("categoriestable").innerHTML = categoriestable;
}
function AddCategory()
{
    var objRequest = new XMLHttpRequest();
    var url= "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory"
    
    var _cname = document.getElementById("cname").value;
    var _cdescription = document.getElementById("cdescription").value;
    
    var newcategory = '{"CName":"' + _cname + '","CDescription":"' + _cdescription + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OperationAddCategory(output);
        }
    }
    
    objRequest.open("POST",url, true);
    objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}
function OperationAddCategory(result)
{
    if (result.WasSuccessful == 1)
    {
        document.getElementById("addresults").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("addresults").innerHTML = "The operation was not successful!" + "<br>" + result.Exception;
    }
}
function ChangeDescription()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    var _cid = document.getElementById("cid").value;
    var _cdescription = document.getElementById("cnewdescription").value;
    
    var changedescription = '{"CID":"' + _cid + '","CDescription":"' + _cdescription + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OperationChangeDescription(output);
        }
    }
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    objRequest.send(changedescription);
}

function OperationChangeDescription(result)
{
    switch(result.WasSuccessful)
    {
    case 1:
        document.getElementById("newdescresults").innerHTML = "The operation was successful!";
        break;
    case 0:
        document.getElementById("newdescresults").innerHTML = "The operation was not successful. Please try again";
        break;
    case -2:
        document.getElementById("newdescresults").innerHTML = "The operation was not successful" + "<br>" + "Please verify that the ID and description are correct";
        break;
    case -3:
        document.getElementById("newdescresults").innerHTML = "The operation was not successful" + "<br>" + "Category ID not found";
        break;
    }
}
function DeleteCategory()
{
    var confirmation = confirm("Are you sure you want to delete this customer?");
    if (confirmation == true)
    {
       var objRequest = new XMLHttpRequest();
       var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/"
       url += document.getElementById("cdeleteid").value;
       
       objRequest.onreadystatechange = function()
       {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OperationDeleteResult(output);
        }
       }
       
       objRequest.open("GET", url, true);
       objRequest.send();
    }
    else
    {
        return;
    }
    
}

function OperationDeleteResult(result)
{
    if (result.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("deleteresults").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("deleteresults").innerHTML = "The operation was not successful" + "<br>" + result.Exception;
    }
}