import { describe } from "mocha";
import app from "../src/app";
import supertest from "supertest";
import { expect } from "chai";
import path from "path";

// import image from "../src/1-assets/images/Backend/src/1-assets/images/2a0b55c8-2c2d-45fa-953a-39daafbf980a.jpg";

//Multiple this is function that collect all my test 
describe("Testing vacations-routes.ts", () => {

    //Single testing--

    //Test for vacation Route That return array of vacations only for logged-in
    it('should return vacations for logged-in user', async () => {
        // This Token return from backend
        const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTIsImZpcnN0TmFtZSI6Ik5vYSIsImxhc3ROYW1lIjoiQ29oZW4gIiwiZW1haWwiOiJub2EyMTVAZ21haWwuY29tIiwicm9sZUlkIjoyfSwiaWF0IjoxNzAzNzA4NDYzLCJleHAiOjE3MDM3MTkyNjN9.FmAlYhomnMbVpjAmFNfiymU8bSBxwvt39OscfHLIfvY';

        const response = await supertest(app.server)
            .get('/api/vacations')
            .set('Authorization', `Bearer ${userToken}`);
        const vacations = response.body
        expect(vacations.length).to.be.greaterThanOrEqual(12);
        expect(response.statusCode).to.be.equal(200);

    });


       //Test for vacation Route That return one vacation only for admin
       it('should return one vacation for admin', async () => {
        // This Token of admin  return from backend
        const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkJhdHlhIiwibGFzdE5hbWUiOiJZZXJ1c2hhbG1pIiwiZW1haWwiOiJiYXR5YTY0MTVAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNzAzNzA4MzY2LCJleHAiOjE3MDM3MTkxNjZ9.PAf9P7WJ1EgyoESixmpym9yZDkCAec1V7UKMQ_fNv74';

        const response = await supertest(app.server)
            .get('/api/vacations/2')
            .set('Authorization', `Bearer ${adminToken}`);
        const vacation = response.body
        expect(vacation).to.not.be.empty;
        expect(response.statusCode).to.be.equal(200);

    });
  
      //Test for vacation Route That add new vacation only for admin
     it('should add a new vacation for admin', async () => {

        // Path to the sample image file (replace with the actual path)
    const imagePath = path.resolve(__dirname, );

    // __dirname returns current file (image-handler.ts) directory 
    // const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

        const vacation = { 
            destination: "Georgia",
            description:"Georgia is a pretty and beautiful country have a lot of attraction for children",
            startDate: "2023-12-24",
            endDate: "2023-12-31",
            price: 5000,
            image: imagePath
        }
        // This Token of admin  return from backend
        const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkJhdHlhIiwibGFzdE5hbWUiOiJZZXJ1c2hhbG1pIiwiZW1haWwiOiJiYXR5YTY0MTVAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNzAzNDUwMzQ1LCJleHAiOjE3MDM0NjExNDV9.jimq5C9xaVfxwRa9auNv1SQaNFLe1E0IlvBMRG4Q-do';

        const response = await supertest(app.server)
            .post('/api/vacations').send(vacation)
            .set('Authorization', `Bearer ${adminToken}`);
        const addedVacation = response.body
        expect(addedVacation).to.not.be.empty;
        expect(addedVacation).to.haveOwnProperty("vacationId");
        expect(addedVacation).to.contain(vacation);

    });


      //Test for vacation Route That update any vacation only for admin not must to update each field
      it('should update any vacation for admin', async () => {

        const vacation = { 
            startDate: "2023-12-24",
            endDate: "2023-12-31",
            price: 4800,
        }
        // This Token of admin  return from backend
        const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkJhdHlhIiwibGFzdE5hbWUiOiJZZXJ1c2hhbG1pIiwiZW1haWwiOiJiYXR5YTY0MTVAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNzAzNzA4MzY2LCJleHAiOjE3MDM3MTkxNjZ9.PAf9P7WJ1EgyoESixmpym9yZDkCAec1V7UKMQ_fNv74';

        const response = await supertest(app.server)
            .patch('/api/vacations/6').send(vacation)
            .set('Authorization', `Bearer ${adminToken}`);
        const updatedVacation = response.body
        // expect(updatedVacation).to.not.be.empty;
        expect(updatedVacation.price).to.equal(vacation.price);
        expect(updatedVacation).to.haveOwnProperty("vacationId");
        expect(updatedVacation).to.contain(vacation);

    });






    


  


})




