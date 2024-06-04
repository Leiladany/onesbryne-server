const supabase = require("../configs/supabase");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.error("Authorization token not found");
    }

    const { data: authUserData, error: authUserError } = await supabase.auth.getUser(token);
    
    if (authUserError || !authUserData) {
      console.error("Failed to authenticate user:", error);
    }
    
    const authUserId = authUserData.user.id

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", authUserId)
      .single();

    if (userError || !userData) {
      console.error("Failed to fetch user data:", error);
    }

    if (userData.role !== "admin") {
      console.error("User is not an admin");
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(403).json({ message: "Unauthorized access" });
  }
};

module.exports = { isAdmin };
