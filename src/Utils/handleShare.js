import {Share} from 'react-native';

export const handleShare = async item => {
  try {
    console.log('Handle Share Called');
    console.log(item);

    let {name, phone_no, location, blood_group, latitude, longitude} = item;
    // If name is null, use the user's name
    name = name ?? item?.user?.name;

    const message = `Name: ${name}\nPhone number: ${phone_no}\nLocation: ${location}\nBlood group: ${blood_group}`;
    const geoUri = `geo:${latitude},${longitude}`;

    // Construct the message with a clickable location
    const messageWithLocation = `${message}\nLocation: <a href="${geoUri}">${geoUri}</a>`;

    // Open the location in a map application
    // await Linking.openURL(geoUri);

    // Share the message with location details and clickable URL
    await Share.share({
      message: message,
    });
  } catch (error) {
    console.error('Error sharing contact info:', error.message);
  }
};
