<h1> Look After - Localhost</h1>

<h2>Backend</h2>
<h3>Developed in Node.js, the following packages are used:</h3>
<h4>[] express</h4>
<h4>[] body-parser</h4>
<h4>[] cors</h4>
<h4>[] nano</h4>
<h4>[] moment</h4>
<h3>Allowed functions in the backend</h3>
<h4> [] Find products. </ h4>
<h4> [] Create product. </ h4>
<h4> [] Update product. </ h4>
<h4> [] Delete product. </ h4>
<h4> [] Buy product. </ h4>
<h4> [] Calculation to zero product in stock. </ h4>
<h2>Frontend</h2>
<h3>Developed in React, the following packages are used::</h3>
<h4>[] axios</h4>
<h4>[] react-router-dom</h4>
<h4>[] bootstrap</h4>
<h4>[] jquery</h4>
<h4>[] popper.js</h4>
<h4>[] react-fontawesome</h4>
<h4>[] sweetalert2</h4>
<h3>Allowed to do on the frontend</h3>
<h4>[] Navigate between pages using single page application</h4>
<h4>[] In the Products tab they are listed</h4>
<h4>[] Allowed to create, edit, refresh list, delete and buy product.</h4>
<h3>Next steps</h3>
<h4> [] When creating product list auto refresh. </ h4>
<h2> Database </h2>
<h3>Used CouchDB</h3>
<h4><a href='http://couchdb.apache.org/' target='_blank'>http://couchdb.apache.org/</a></h4>
<h3>After installing CouchDB, open the console and create the database with the following command:</h3>
<h4>[] curl -X PUT http://127.0.0.1:5984/products</h4>
<h3>Check if you created the database.</h3>
<h4>[] curl -X GET http://127.0.0.1:5984/_all_dbs</h4>
<h3>Access the Project Fauxton.</h3>
<h4>[] <a href='http://127.0.0.1:5984/_utils/#login' target='_blank'>http://127.0.0.1:5984/_utils/#login</a></h4>
<h3>To make receive the values of the products a design document was created according to the image.</h3>
<img src="/lookafter-gui/src/assets/img/mydoc.png">
<h3>Create an admin user on:</h3>
<h4>[] <a href='http://127.0.0.1:5984/_utils/#addAdmin/couchdb@localhost' target='_blank'>http://127.0.0.1:5984/_utils/#addAdmin/couchdb@localhost</a></h4>
<h3>In the code you will have to make the connection with the database as image.</h3>
<img src="/lookafter-gui/src/assets/img/adminCDB.png">
<h2>Next steps of the project</h2>
<h3>Use NGINX</h3>
<h2>My application is running</h2>
<img src="/lookafter-gui/src/assets/img/myapp.gif">
