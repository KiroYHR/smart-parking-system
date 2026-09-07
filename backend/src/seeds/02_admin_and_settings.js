exports.seed = async function(knex) {
  // 1. Seed cấu hình hệ thống Settings (nếu chưa có)
  const existingSettings = await knex('Settings').first();
  if (!existingSettings) {
    await knex('Settings').insert({
      id: 1,
      car_hour_price: 10000,
      car_day_price: 60000,
      car_night_price: 20000,
      moto_hour_price: 4000,
      moto_day_price: 30000,
      moto_night_price: 8000,
      truck_hour_price: 15000,
      truck_day_price: 120000
    });
  }

  // 2. Seed tài khoản Admin mặc định để đăng nhập Web Dashboard
  const existingAdmin = await knex('Users').where({ phone_number: '0988888888' }).first();
  if (!existingAdmin) {
    await knex('Users').insert({
      full_name: 'Quản trị viên Hệ thống',
      phone_number: '0988888888',
      password_hash: 'admin123',
      role: 'Admin',
      wallet_balance: 1000000.00
    });
  }

  // 3. Seed tài khoản VIP mẫu
  const existingVip = await knex('Users').where({ phone_number: '0912345678' }).first();
  if (!existingVip) {
    await knex('Users').insert({
      full_name: 'Khách hàng VIP (Mẫu)',
      phone_number: '0912345678',
      password_hash: '123456',
      role: 'VIP',
      wallet_balance: 500000.00
    });
  }
};
