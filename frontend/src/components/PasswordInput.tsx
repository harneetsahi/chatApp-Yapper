function PasswordInput() {
  return (
    <>
      <label className="input validator">
        <svg className="h-[1em] opacity-50" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          type="password"
          required
          placeholder="Password"
          minLength={8}
          maxLength={16}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be 8 characters to 16 characters, including number, lowercase letter, uppercase letter, special character"
        />
      </label>
      <p className="validator-hint hidden">
        Must be 8 to 16 characters including
        <br />
        At least one number
        <br />
        At least one lowercase letter
        <br />
        At least one uppercase letter
        <br />
        At least one special character
      </p>
    </>
  );
}

export default PasswordInput;
