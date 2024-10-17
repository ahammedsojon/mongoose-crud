import { User } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  password: process.env.super_admin_pass,
  email: 'ahammedsojon000@gmail.com',
  needsPasswordChange: false,
  role: 'superAdmin',
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const superAdmin = await User.findOne({ role: 'superAdmin' }, { role: 1 });
  if (!superAdmin) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
