pipeline {
	agent { label 'master' }
	
		stages {
			stage('test'){
				steps {
					bat "npm test"
				}
			}
		}
}