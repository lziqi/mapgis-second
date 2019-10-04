import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class vertifyLogin extends HttpServlet
{
    @Override
    public void init(){}


    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
    {
        Map<String,String[]> map = new HashMap<>();
        map = request.getParameterMap();
        if(map == null)
            return;
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if(username.trim()!=null && password.trim()!=null)
        {
            try {
                PrintWriter printWriter = response.getWriter();
                if(username.equals("liuziqi") && password.equals("123456"))
                {
                    printWriter.write("true");
                }
                else
                    printWriter.write("false");
                printWriter.close();
            }catch (Exception e)
            {
                e.printStackTrace();
                System.out.println("vertiry in write error");
            }
        }
    }

    @Override
    public void destroy(){
        super.destroy();
    }
}
