const supabase = require("../../configs/supabase");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      if (data) {
        const userCopy = { ...data };
        delete userCopy.passwordHash;
        res.status(200).json({ user: userCopy });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const { data, error } = await supabase
        .from("users")
        .update(req.body)
        .eq("id", userId)
        .select();
      if (error) throw error;
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const { error } = await supabase.from("users").delete().eq("id", userId);
      if (error) throw error;
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
