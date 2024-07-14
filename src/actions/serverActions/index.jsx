import ToastMsg from "@/components/toast/ToastMsg";
import prisma from "@/utils/prisma";
import { toast } from "react-toastify";

export const creatTask= async (values)=>{
 try {
      await prisma.task.create({
        data: values,
      });
      toast.success(<ToastMsg title={"Created successfully"} />);
      return {success:true}
    } catch (err) {
      console.log(err);
      return {success:false}
    }
}