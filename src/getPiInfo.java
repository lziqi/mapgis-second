
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class getPiInfo extends HttpServlet
{

    @Override
    public void init()
    {

    }

    @Override
    public void doPost(HttpServletRequest request,HttpServletResponse response)
    {
        try {

            //get inputstream string
            byte[] b = new byte[1024];
            int len = request.getInputStream().read(b);
            String info = new String(b);
            System.out.println("post http len is "+ len);
            System.out.println("post http info is "+ info);

            Integer id = Integer.parseInt(info.split("&")[0]);
            Integer trash_class = Integer.parseInt(info.split("&")[1]);
            Integer trash_id = Integer.parseInt(info.split("&")[2]);
            Double distance = Double.parseDouble(info.split("&")[3]);
            if(configuration.m_trashInfo.containsKey(id))
            {
                TrashInfo trashInfo = configuration.m_trashInfo.get(id);
                if(trash_class == 1)//可回收
                    trashInfo.m_recycle_trash[trash_id].m_distance = distance;
                else if(trash_class == 2)//厨余
                    trashInfo.m_kitchen_trash[trash_id].m_distance = distance;
                else if (trash_class == 3)//有害
                    trashInfo.m_other_trash[trash_id].m_distance = distance;
                else if(trash_class == 4)//有害
                    trashInfo.m_harm_trash[trash_id].m_distance = distance;
                configuration.m_trashInfo.put(id,trashInfo);
            }
            /*System.out.println("username is "+request.getParameter("username"));
            System.out.println("password is "+request.getParameter("password"));*/
        }catch (Exception e)
        {
            e.printStackTrace();
            System.out.println("Post:GetPiInfo response error");
        }
    }

    @Override
    public void destroy()
    {
        super.destroy();
    }
}
