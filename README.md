add a BACKEND_URL variable to config.js

to run local tests:
- change BACKEND_URL to 'http://localhost:3000' or 'http://192.168.1.xxx:3000' if you want to test on other devices on your network
- run server frontend server with 'python -m http.server 8000'

to run in production:
- change BACKEND_URL to 'https://api.lifescape.app'
