const BloodGroupList = [];

const valuesToAdd = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

// Adding new values to the original list
valuesToAdd.forEach(value => {
  BloodGroupList.push({
    label: value,
    value: value,
  });
});

export default BloodGroupList;