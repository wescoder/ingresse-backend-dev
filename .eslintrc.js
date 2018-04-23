module.exports = {
  extends: [
    'standard',
    'plugin:ava/recommended'
  ],
  plugins: [
    'ava'
  ],
  rules: {
    'ava/no-ignored-test-files': 'off'
  }
}
