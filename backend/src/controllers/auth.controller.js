export const signup = (req, res) => {
  console.log("Signup route hit");
  res.send("signup")
}
export const login = (req, res) => {
  res.send("login")
}
export const logout = (req, res) => {
  res.send("logout")
}