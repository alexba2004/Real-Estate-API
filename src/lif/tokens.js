const generateToken = () => {
    const random1 = Math.random().toString(32).substring(2);
    const timestamp = Date.now().toString(32);
    const random2 = Math.random().toString(32).substring(2);

    return random1 + timestamp + random2;
};

export default generateToken;
