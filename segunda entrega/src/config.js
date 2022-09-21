export default {
    pers: 'json',
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebaseConfig: {
        apiKey: "AIzaSyCM-SEmZVQe1NrMtWJh4IJmE5nmmVfXIu8",
        authDomain: "backend-ecommerce-338ae.firebaseapp.com",
        projectId: "backend-ecommerce-338ae",
        storageBucket: "backend-ecommerce-338ae.appspot.com",
        messagingSenderId: "866415921539",
        appId: "1:866415921539:web:5048eddc04d50531540eb6"
      },
}
