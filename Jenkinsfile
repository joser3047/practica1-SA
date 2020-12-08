pipeline {
	agent { label 'master' }
	
		stages {
            stage('install'){
				steps {
					bat "npm install"
				}
			}
			stage('test'){
				steps {
					bat "npm test"
				}
			}
            stage('despliegue'){
                steps {
                    bat "cd C:\\Users\\Jose\\Desktop\\Despliegue\\practica1-SA && git pull && npm install && .\\node_modules\\pm2 restart all"
                }
            }
		}
}