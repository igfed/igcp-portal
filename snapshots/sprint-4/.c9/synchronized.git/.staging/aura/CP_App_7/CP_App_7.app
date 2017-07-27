<aura:application extends="force:slds" tokens="c:CP_Primary_Token" >
    
    <c:mobileViewport />
    <c:CP_CSS_Includes />
   	
   	<!--MainContainer div, do not add any classes or ids to this-->
    <div>
        <c:CP_Header_Registration />
        
        <!--<c:CP_Login_Forgot_Username />-->
        <!--<c:CP_Login_Forgot_Username_Step2 />-->
        
        <!--<c:CP_Login_Forgot_Password_Step1 />-->
        <!--<c:CP_Login_Forgot_Password_Step2 />-->
        <c:CP_Login_Forgot_Password_Step3 />
        
        <c:CP_Footer /> 
        <c:CP_Modal />
    </div>
    
    <c:CP_JS_Includes />
</aura:application>