# README

## Note

1. Currently use ruby 2.7.1
2. App runs on port 5000
3. Currently uses rails ~> 7.0.4
4. Uses forman. You can install with `gem install foreman`
5. Uses node version 16.3.2 and yarn version 1.22.7. However any closer versions should be fine.

## Setting up development environment

1. Clone repository from [here](https://github.com/FaithAdekunle/slot-booking.git)
2. cd into slot-booking
3. Run `bundle install`
4. Run yarn install
5. Create db with `rails db:create`
6. Run migrations with `rails db:migrate`
7. Start server with foreman start -f Procfile.dev
8. Visit `http://localhost:5000/` in your browser

## Testing with Rspec

Just run `rspec` to run test cases
