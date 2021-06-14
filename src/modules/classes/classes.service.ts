import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from 'src/schemas/class.schema';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name)
    private classModel: Model<ClassDocument>,
  ) {}

  async getClasses(params) {
    let id;
    if (params.userId) {
      id = params.userId;
    }
    const classes = await this.classModel.find(params);
    if (id) {
      let arr2 = [];
      classes.forEach((c) => {
        if (id in c) {
          arr2.push(c);
        }
      });
      return arr2;
    }
    return classes;
  }

  async createClass(body) {
    body.date = new Date(body.date).toDateString();
    body.start = new Date(body.start).toUTCString();
    body.end = new Date(body.end).toUTCString();
    const createdClass = await this.classModel.create(body);
    return createdClass;
  }

  async updateClass(params, body) {
    const updatedClass = await this.classModel.updateOne(params, {
      $set: body,
    });
    if (updatedClass.ok) {
      return true;
    } else {
      throw new HttpException(
        'error occured while updating class',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteClass(params) {
    const delClass = await this.classModel.deleteOne(params);
    if (delClass.ok) {
      return true;
    } else {
      throw new HttpException(
        'error occured while deleting class',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
