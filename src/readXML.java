import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;




public class readXML
{
    Document m_doc;
    File m_file;

    public readXML(String s)
    {
        m_file = new File(s);
        if(m_file.exists())
        {
            try {
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                m_doc = builder.parse(m_file);
            }catch (Exception e)
            {
                e.printStackTrace();
                System.out.println("read xml error");
            }
        }
        else
            System.out.println("file not exist");
    }
}
