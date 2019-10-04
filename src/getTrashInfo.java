import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.io.PrintWriter;

public class getTrashInfo extends HttpServlet {

    @Override
    public void init() {

    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            PrintWriter writer = response.getWriter();

            int id = Integer.parseInt(request.getParameter("id"));
            String trashInfo = "";

            //获取申请id的垃圾桶点信息
            if(configuration.m_trashInfo.containsKey(id)) {
                TrashInfo key = configuration.m_trashInfo.get(id);
                //对可回收垃圾桶
                int recycleNum = key.m_recycle_trash.length;
                int kitchenNum = key.m_kitchen_trash.length;
                int otherNum = key.m_other_trash.length;
                int harmNum = key.m_harm_trash.length;
                if (recycleNum == 0)
                    trashInfo += "-1";
                else {
                    for (int i = 0; i < recycleNum; i++) {
                        trashInfo += key.m_recycle_trash[i].m_distance;
                        trashInfo += " ";
                        trashInfo += key.m_recycle_trash[i].m_oldDistance;
                        trashInfo += " ";
                        trashInfo += key.m_recycle_trash[i].m_height;
                        trashInfo += "|";
                    }
                    trashInfo = trashInfo.substring(0, trashInfo.length() - 1);
                }
                trashInfo += "&";
                //厨余垃圾
                if (kitchenNum == 0)
                    trashInfo += "-1";
                else
                {
                    for(int i = 0;i < kitchenNum;i++)
                    {
                        trashInfo += key.m_kitchen_trash[i].m_distance;
                        trashInfo += " ";
                        trashInfo += key.m_kitchen_trash[i].m_oldDistance;
                        trashInfo += " ";
                        trashInfo += key.m_kitchen_trash[i].m_height;
                        trashInfo += "|";
                    }
                    trashInfo = trashInfo.substring(0,trashInfo.length()-1);
                }
                trashInfo += "&";
                //其他垃圾
                if(otherNum == 0)
                    trashInfo += "-1";
                else
                {
                    for(int i = 0;i < otherNum;i++)
                    {
                        trashInfo += key.m_other_trash[i].m_distance;
                        trashInfo += " ";
                        trashInfo += key.m_other_trash[i].m_oldDistance;
                        trashInfo += " ";
                        trashInfo += key.m_other_trash[i].m_height;
                        trashInfo += "|";
                    }
                    trashInfo = trashInfo.substring(0,trashInfo.length()-1);
                }
                trashInfo += "&";
                //有害垃圾
                if(harmNum == 0)
                    trashInfo += "-1";
                else{
                    for(int i = 0; i < harmNum;i++)
                    {
                        trashInfo += key.m_harm_trash[i].m_distance;
                        trashInfo += " ";
                        trashInfo += key.m_harm_trash[i].m_oldDistance;
                        trashInfo += " ";
                        trashInfo += key.m_harm_trash[i].m_height;
                        trashInfo += "|";
                    }
                    trashInfo = trashInfo.substring(0,trashInfo.length()-1);
                }
            }

            writer.print(trashInfo);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("getTrashInfo get error");
        }
    }

    @Override
    public void destroy() {
        super.destroy();
    }
}
