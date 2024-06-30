import mongoose from 'mongoose';
import app from './app';
import config from './config';

const main = async () => {
  try {
    await mongoose
      .connect(config.database_url!)
      .then(() => console.log('Database has been connected!'))
      .catch(() => 'Something went wrong!');

    app.listen(config.port, () => {
      console.log('Server is listening at port ', config.port);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
