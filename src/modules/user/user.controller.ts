import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {

  try {

    const result = await userService.createUserIntoDB(req.body)

    // console.log(result);

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {

    const result = await userService.getAllUsersFromDB()


    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {

    const result = await userService.getSingleUserFromDB(id as string)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrived successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}


const updateUser = async (req: Request, res: Response) => {
  const id  = req.params.id;
  const { name, password, age, is_active } = req.body;

  try {

    const result = await userService.updateUserInDB(name, password, age, is_active, id as string)

        if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}

const deleteUser = async(req : Request, res : Response) => {

  const id = req.params.id;

  try {

    const result = await userService.deleteUserFromDB(id as string)

              if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

          res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {},
    });
  } catch (error : any) {
        res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }

}


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}