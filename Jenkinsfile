pipeline {
	agent { label 'master' }
	
		stages {
			stage('test'){
				steps {
					sh "npm test"
				}
			}
		}
}