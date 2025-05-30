declare global {
    namespace Express {
      interface User extends JwtRequestUser {}
    }
  }