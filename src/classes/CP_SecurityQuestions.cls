public with sharing class CP_SecurityQuestions {
	public CP_SecurityQuestions() {
		
	}

	public class SecurityQuestions extends CP_Response
    {
        public Result State {get; set;}
        public List<Question> Questions {get; set;}
        public SecurityQuestions()
        {
        	super();
            Questions = new List<Question>();
        }

        public void loadQuestionsFromISAM()
        {
            // Have to replace following code with actual ISAM call 
            this.Questions.add(new Question('What\'s your dog\'s name?'));
            this.Questions.add(new Question('Where were you born?'));
            this.Questions.add(new Question('What\'s your mother\'s maiden name?'));
        }
    }

    public class Question {
    	public String Question {get; set;}
    	public String Answer {get; set;}

    	public Question(String q)
    	{
    		this.Question = q;
    	}
    }

}