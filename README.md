#Investors Group Client Portal (igcp)

This is the primary repo for component development for the sandbox portaldev2

Contents:
=========

1) Aura Components

2) Static Resources

3) cp-patternlib - A static version of the client portal specific styling, contains overrides for the slds, and custom igcp styles, as well as element styling.
4) slds - A customized static version of the Salesforce Lightning Design System

Environment Setup
=================

1) Download and install Mavensmate(MM) desktop: http://mavensmate.com/

2) Inside Mavensmate(MM) open settings and set workspace path to the location of your Mavensmate workspace (Just create a folder 'mm_workspace' if you don't have a pre-existing workspace).

3) In MM click on the folder icon and select New Project, this will prompt you to log into your Salesforce environment. 

4) Under project name, name your project 'igcp-portal' and create project, this will auto generate a 'igcp-portal' directory in your MM workspace.

5) Go inside MM workspace in explorer/finder and rename generated directory to 'igcp-mm'.

6) Inside MM workspace clone igcp-portal repo: https://github.com/igfed/igcp-portal.git

7) Go inside 'igcp-mm' and copy the 'config' directory and any IDE settings file (ex. igcp-portal.sublime-workspace, igcp-portal.sublime-project) over to 'igcp-portal' 

8) Delete 'igcp-mm'

9) Inside MM click on Monitor icon in the left sidebar and launch your preferred IDE.

10) Everytime you save a file, MM should now sync the changes with the SF environment