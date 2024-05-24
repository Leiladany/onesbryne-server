const supabase = require("../../configs/supabase");

const AuthController = {
  signupUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      console.log(data)
      res.status(201).json({ data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log(data)
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = AuthController;
