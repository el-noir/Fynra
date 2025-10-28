import type { Request, Response } from "express";

export const getStatus = async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json({ status: "success", code: 200, message: "Working" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", code: 500, message: "Failed", error: error.message });
  }
};
