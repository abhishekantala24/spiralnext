import { EncryptStorage } from 'encrypt-storage'

export const encryptStorage = new EncryptStorage('P@ssw0rd!23', {
  prefix: '@secure',
});