async function getData() {
    const url =
        "https://charityfunction-evhxczathuecbpcn.westeurope-01.azurewebsites.net/api/getcharities";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Response status: ${response.status}");
    }

    return await response.json();
}

function getParsedCharities(data) {
    return data.map(charity => ({
        registrationNumber: charity.RegistrationNumber,
        charityName: charity.CharityName,
        publicAddress: charity.PublicAddress,
        website: charity.Website,
        email: charity.Email,
        telephone: charity.Telephone,
        description: charity.Description,
        beneficiaries: charity.Beneficiaries,
        operatingModel: charity.OperatingModel,
        otherName: charity.OtherName,
    }));
}