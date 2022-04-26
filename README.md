                                                        Documentation
To start testing the decentralized application on a localhost, first we need to set up truffle on our computer. Truffle (also known as Ganache), can quickly fire up a personal Ethereum blockchain locally which we can use to run tests, execute commands, and inspect state while controlling how the chain operates.

 ![image](https://user-images.githubusercontent.com/52153734/165371931-d68cb1f1-c9bf-446a-b379-e289eac0c823.png)
Figure 1 In this directory, run the command “truffle dev” on the command prompt. 10 Ethereum accounts will be created, and we will obtain the Ethereum addresses and Private Keys as follow for our testing purposes






![image](https://user-images.githubusercontent.com/52153734/165371940-124a2972-b5f4-455f-a35e-e919ff80107a.png)

Figure 2 The command prompt of starting truffle environment




![image](https://user-images.githubusercontent.com/52153734/165371996-155cfdb2-9a10-4eaa-b0d6-067f5a5ff4f1.png) 

Figure 3 As an alternative, we can download and start Ganache to achieve the same purpose while having better visualizations about the contracts deployed, gas spent and transactions that have taken place. Open up the workspace of Ganache and run truffle-config file in it as shown above.

![image](https://user-images.githubusercontent.com/52153734/165372025-4cde53fa-5b41-47ca-9bde-39abba4f0d4c.png)	

Figure 4 Ganache provides detail information about each transaction, event, and log that have taken place, allowing us to debug it quickly:

After setting up truffle/Ganache, change directories into the client folder. Run the command “npm start” on the command prompt.

![image](https://user-images.githubusercontent.com/52153734/165372055-cf8360a3-884b-40e0-ac36-334be37e784a.png) 


Figure 5 The command prompt of starting our react front-end on the localhost

A window will appear which redirects you to the login page of our decentralized application on the localhost as follow:

![image](https://user-images.githubusercontent.com/52153734/165372074-e3f096f2-53c2-41dd-88f1-8fb4e1ff319c.png) 
Figure 6 The Login page where the user will be redirected to once the program starts.

At this point, the first experiment is done, and our decentralized application is now hosted on the localhost.


Everything on our web application is free from human intervention, except for the approval of application to be registered as a supplier. This is to prevent everyone from signing up to become a supplier without even having the ability to provide testing service to users. Hence, admins have to screen through the application and approve them manually.

To create a supplier, register on the web application as shown below. In the normal circumstances, the entire information of the applicant will be sent via email to the admin. Since you won’t receive an email about the information of the applicants now, you will have to copy everything manually and save it somewhere locally. 
![image](https://user-images.githubusercontent.com/52153734/165372105-8d28829d-5275-40d6-a28f-7842e370d7d2.png)


Next, we can mimic the approval process of a supplier by heading to http://localhost:3000/admin-page. 
At the admin page, you can choose to approve a kiosk or a hospital. A kiosk is someone with the SpectraLIT device and thus a user cannot make an appointment with a kiosk supplier.


![image](https://user-images.githubusercontent.com/52153734/165372132-669d2b9a-f3fc-4eb2-b56c-f4c34cb2b8fa.png)

  

On the other hand, a hospital is a health institution where a user can schedule an appointment in our web application for Covid-19 testing.


Click on any of the option and fill in the information of the applicants that you have copied just now. Upon submission, the applicant will become a supplier.


![image](https://user-images.githubusercontent.com/52153734/165372171-2401bd16-cf45-44bc-bdde-b414374f937a.png)

![image](https://user-images.githubusercontent.com/52153734/165372181-2e12d406-86c5-429a-8677-8cef498671c5.png)




                                                A Walkthrough of User Interfaces 
We have designed our system architecture carefully and produced some amazing user interfaces to provide our users with best experience. A walkthrough of our user interfaces is as follow: 

![image](https://user-images.githubusercontent.com/52153734/165372200-e7189f8a-cf46-4d8a-be4f-170dc9768674.png) 
Figure 7 The user will get to choose to either register as a user or a test supplier.

![image](https://user-images.githubusercontent.com/52153734/165372212-67e9c909-587a-418f-9af3-c1011f6db932.png)
Figure 8. To become a new user, one has to fill in important information including Ethereum address and Public Key that they got before hand.

![image](https://user-images.githubusercontent.com/52153734/165372225-a072041b-1313-481b-86cb-d272e1c3e9bb.png) 
Figure 9. The user will get to choose to either sign in as a user or a test supplier.

![image](https://user-images.githubusercontent.com/52153734/165372244-f81c7eb5-0f05-4475-9009-a0ef175a904d.png) 
Figure 10. The user will need to provide username, password, and private key for login.

![image](https://user-images.githubusercontent.com/52153734/165372252-c707c5cf-3bd9-4f82-8035-5fbb57966c3b.png) 
Figure 11. The user will be redirected to the user landing page upon login.

![image](https://user-images.githubusercontent.com/52153734/165372276-7163f827-4302-47a9-80fa-bc8c1c708b06.png) 
Figure 12. The user will get to make an appointment with the health institutions which have registered in our web application for Covid-19 testing.

 ![image](https://user-images.githubusercontent.com/52153734/165372288-815121fa-b053-44b4-919b-0594e467f9c5.png)
Figure 13. The user can refer to the results in History page to retrieve their pending results.

![image](https://user-images.githubusercontent.com/52153734/165372303-db4302cd-2c6e-4e14-9bec-04f623ce1ac0.png) 
Figure 14. On clicking on any of the pending results in history page, a modal will pop out to prompt the user to pay to view his result.

![image](https://user-images.githubusercontent.com/52153734/165372315-0c70a7df-9fe3-4620-b857-3b587c09a1dd.png) 
Figure 15. On clicking the “Pay to View” button, another modal will pop out to display the payment details and users can pay to unveil their pending results.

![image](https://user-images.githubusercontent.com/52153734/165372332-090f0816-529d-4c65-ac35-21cd291fbd88.png) 
Figure 16. On clicking the “Appointments” header on the history page, another modal will pop out to display the payment details and users can pay to unveil their pending results.

![image](https://user-images.githubusercontent.com/52153734/165372344-991473f7-2037-4208-aea6-5ee5b33b1969.png)
 
Figure 17. On clicking the “User Information” on the side navigation bar of user landing page, the user will be redirected to the user information page, and this QR code can be shown to the PIC at kiosk to identify their identity and Ethereum address easily during the Covid-19 testing.

 ![image](https://user-images.githubusercontent.com/52153734/165372361-c455ff83-cb2c-4bea-bf49-78292e0d3eec.png)
Figure 18. On clicking the “Latest Test Result” button on the user landing page, users will be redirected to the latest user result page, where they will be prompted to pay to view their latest test result.
 
 ![image](https://user-images.githubusercontent.com/52153734/165372368-271ff6d3-e2b0-4bd1-8dd1-c69c358fe72a.png)
Figure 19. On clicking the “Pay to View” button, another modal will pop out to display the payment details and users can pay to unveil their latest results.

 ![image](https://user-images.githubusercontent.com/52153734/165372383-e31fa5a9-a9b3-47db-b5a9-b385c489ef0a.png)
Figure 20. To become a new supplier, one has to fill in important information including Ethereum address, Healthcare Provider Number that they got before hand.

![image](https://user-images.githubusercontent.com/52153734/165372387-2af1d079-a467-432f-ab13-2ce0ff7c9ba4.png) 
Figure 21. To login as a supplier, one has to provide the username, password and private key.

 ![image](https://user-images.githubusercontent.com/52153734/165372403-27e53c1d-4157-4060-ad75-2aab9d39c137.png)
Figure 22. Upon logging in, the supplier will be redirected to the supplier landing page.

 ![image](https://user-images.githubusercontent.com/52153734/165372418-b6f37ce3-4cdb-4663-b2b1-a968f96b2fec.png)
Figure 23. On clicking on the “Incoming Appointment” on the sidebar, a supplier can see all the incoming appointments.

 ![image](https://user-images.githubusercontent.com/52153734/165372427-efe35eac-e561-48c2-9c29-7e5d505ebe44.png)
Figure 24. Clicking on any of the incoming appointments, the health institution can manually input the test result of the patient if the patient signs up for a testing kit differs from the SpectraLIT device. 

![image](https://user-images.githubusercontent.com/52153734/165372444-b0e50e06-5aa2-4984-a7ee-d6842e7097a3.png)
Figure 25. On clicking on the “History” on the sidebar of supplier landing page, a supplier can see all the incoming appointments.



