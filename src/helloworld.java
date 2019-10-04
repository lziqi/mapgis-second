
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class helloworld extends HttpServlet
{

    private String m_message;
    @Override
    public void init()
    {
        m_message = "hello world!";
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    {
        try {
            response.setContentType("text/html");

            PrintWriter out = response.getWriter();
            out.println("<h1>"+m_message+"</h1>");
        }catch (IOException e)
        {
            e.printStackTrace();
            System.out.println("helloworld response error");
        }
    }

    @Override
    public void destroy()
    {
        super.destroy();
    }
}
