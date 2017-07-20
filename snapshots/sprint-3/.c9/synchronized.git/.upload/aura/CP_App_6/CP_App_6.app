<aura:application extends="force:slds" tokens="c:CP_Primary_Token" >
    
    <c:mobileViewport />
    <c:CP_CSS_Includes />
   	
   	<!--MainContainer div, do not add any classes or ids to this-->
    <div>
        <c:CP_Header_Registration />
        <c:CP_Registration />
        <c:CP_Footer /> 
        <c:CP_Modal />
    </div>
    
    <c:CP_JS_Includes />
</aura:application>