import { LocalStrategy } from './local';
import { Strategy } from 'passport-local';
describe('Local', () => {
  it('should be defined', () => {
    expect(new LocalStrategy(Strategy)).toBeDefined();
  });
});
