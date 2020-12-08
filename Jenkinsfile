pipeline {
	agent { label 'master' }
	
		stages {
            stage('install'){
				steps {
					bat "npm install"
				}
			},
			stage('test'){
				steps {
					bat "npm test"
				}
			}
		}
}