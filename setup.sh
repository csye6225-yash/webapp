#!/bin/bash

# Update the package list
sudo apt-get update
sudo apt-get upgrade -y

# Install Unzip
sudo apt-get install -y unzip

# Install Node.js and check the version
sudo apt-get install -y nodejs npm

# Install NPM
sudo apt-get install npm -y

# Install MariaDB server
sudo apt-get install -y mariadb-server

# Start the MariaDB service and enable it
sudo systemctl start mariadb
sudo systemctl enable mariadb

# # Secure MariaDB installation
# sudo mysql_secure_installation -y

sudo mysql -uroot -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'yash';FLUSH PRIVILEGES;CREATE DATABASE database_development;"


mkdir ~/Yash_Bhatia_002791499_03
sudo unzip "/tmp/Yash_Bhatia_002791499_03.zip" -d "/Yash_Bhatia_002791499_03/"
# sudo chmod 655 "/opt/Yash_Bhatia_002791499_03"
(cd /Yash_Bhatia_002791499_03 && sudo npm install)

sudo apt-get clean




# # Log in to MariaDB and perform SQL commands
# sudo mysql -u root -p <<MYSQL_SCRIPT
# ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
# FLUSH PRIVILEGES;
# CREATE DATABASE database_development;
# EXIT
# MYSQL_SCRIPT
