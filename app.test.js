const app = require('./app')
const Museum = require('./museum')
const axios = require('axios');
const supertest = require("supertest");
jest.mock("axios");

describe("when API call fails", () => {
    it("should return empty museum list", async () => {
        const message = "Network Error";
        axios.get.mockRejectedValueOnce(new Error(message));

        const result = await Museum.getmuseumData();

        expect(axios.get).toHaveBeenCalledWith('https://data.lacity.org/resource/trxm-jn3c.json');
        expect(result).toEqual(undefined);
    });
});

test('Getting Data from museum api should not be undefined', async () => {
    const result = await Museum.getmuseumData();

    expect(result).toBeTruthy();
});

test("etting Data from museum api should not be undefined", async () => {

    await supertest(app).get("/api/visitors")
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response)).toBeTruthy();
            expect(response).toEqual(1);

        });
});