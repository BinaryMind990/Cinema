<h1>Cinema App</h1>

<h2>Description</h2>
<p>
	The Cinema App is a web application developed as part of the "Cinema"
	project. It allows users to browse and reserve movie screenings in a cinema.
</p>

<h2>Features</h2>
<ul>
	<li>Browsing a list of movies, screening types, and halls</li>
	<li>
		Viewing details of screenings, including time, hall, and available tickets
	</li>
	<li>Reserving tickets for desired screenings</li>
	<li>Adding new screenings to the system</li>
	<li>User registration and authentication</li>
	<li>Simulating the ticket purchasing process</li>
	<li>
		Admin functionalities:
		<ul>
			<li>Managing movies, screenings, and users</li>
			<li>Viewing sales reports</li>
			<li>Searching and filtering data</li>
		</ul>
	</li>
</ul>

<h2>Technologies</h2>
<p>The application is developed using the following technologies:</p>
<ul>
	<li>Frontend: React.js</li>
	<li>Backend: Java(SpringBoot)</li>
	<li>Database: MySQL</li>
</ul>

<h2>Installation and Setup</h2>
<ol>
	<li>Clone the GitHub repository to your local machine:</li>
</ol>
<pre><code>git clone https://github.com/BinaryMind990/Cinema.git</code></pre>

<ol start="2">
	<li>Set up the MySQL database and run the necessary scripts.</li>
	<li>
		Start the backend server:
		<ol>
			<li>Navigate to the <code>server/cinema-app/src/java/com/cinema</code> directory.</li>
			<li>Run the <code>CinemaApplication.java</code> file.</li>
		</ol>
	</li>
	<li>
		Start the frontend application:
		<ol>
			<li>Navigate to the <code>client/cinema-app</code> directory.</li>
			<li>Install the dependencies:</li>
		</ol>
		<pre><code>npm install</code></pre>
		<ol start="3">
			<li>Start the React development server:</li>
		</ol>
		<pre><code>npm start</code></pre>
	</li>
	<li>
		The application will be accessible at
		<a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.
	</li>
</ol>

<h2>Contributing</h2>
<p>
	If you would like to contribute to the development of this application, feel
	free to open an issue or submit a pull request on the GitHub repository.
</p>

<h2>License</h2>
<p>
	This application is licensed under the MIT License. For more details, see the
	<a href="LICENSE">LICENSE</a> file.
</p>
