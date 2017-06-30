<aura:application access="GLOBAL" extends="ltng:outApp" implements="ltng:allowGuestAccess" tokens="c:CP_Primary_Token" >
    
    <aura:dependency resource="c:mobileViewport" type="COMPONENT"/>
    <aura:dependency resource="c:CP_CSS_Includes" type="COMPONENT"/>
    <aura:dependency resource="c:CP_Header_Signed_Out" type="COMPONENT"/>
    <aura:dependency resource="c:CP_Login_Component_3" type="COMPONENT"/>
    <aura:dependency resource="c:CP_Footer_Component" type="COMPONENT"/>
    <aura:dependency resource="c:CP_JS_Includes" type="COMPONENT"/>
</aura:application>