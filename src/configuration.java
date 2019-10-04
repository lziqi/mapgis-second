//
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.*;

import java.io.*;
import java.util.*;


class Trash
{
    Integer m_trashClass;//1可回收2厨余3其他4有害
    Integer m_id;
    double m_distance;
    double m_oldDistance;
    double m_height;

    public Trash(int x)
    {
        m_trashClass = x;
    }
}

class TrashInfo
{
    double m_lat;
    double m_long;
    //可回收
    Trash[] m_recycle_trash;
    //厨余
    Trash[] m_kitchen_trash;
    //其他
    Trash[] m_other_trash;
    //有害
    Trash[] m_harm_trash;
}

public class configuration
{
    static Map<Integer,TrashInfo> m_trashInfo;

    static
    {
        try {
            System.out.println("configuration start.....................");
            new TimerManager();
            m_trashInfo = new HashMap<>();
            /*readXML readxml = new readXML("data/trash.xml");

            
            //获取垃圾桶列
            NodeList trashList = readxml.m_doc.getElementsByTagName("trash");
            for(int i = 0;i < trashList.getLength();i++)
            {
                //对每个地点来说
                TrashInfo trashInfo = new TrashInfo();
                Node trash = trashList.item(i);
                Element trashelement = (Element)trash;
                int id = Integer.parseInt(trashelement.getAttribute("id"));
                trashInfo.m_lat = Double.parseDouble(trashelement.getAttribute("lat"));
                trashInfo.m_long = Double.parseDouble(trashelement.getAttribute("long"));


                //初始化垃圾桶数组
                Element recycleNum = (Element)trashelement.getElementsByTagName("recycleNum").item(0);
                trashInfo.m_recycle_trash = new Trash[Integer.parseInt(recycleNum.getAttribute("num"))];
                Element kitchenNum = (Element)trashelement.getElementsByTagName("kitchenNum").item(0);
                trashInfo.m_kitchen_trash = new Trash[Integer.parseInt(kitchenNum.getAttribute("num"))];
                Element otherNum = (Element)trashelement.getElementsByTagName("otherNum").item(0);
                trashInfo.m_other_trash = new Trash[Integer.parseInt(otherNum.getAttribute("num"))];
                Element harmNum = (Element)trashelement.getElementsByTagName("harmNum").item(0);
                trashInfo.m_harm_trash = new Trash[Integer.parseInt(harmNum.getAttribute("num"))];


                //向垃圾桶中放入值
                if(!recycleNum.getAttribute("num").equals("0"))
                {
                    NodeList TrashList = recycleNum.getElementsByTagName("recycleTrash");
                    for(int j = 0;j < TrashList.getLength();j++)
                    {
                        Node currentTrashNode = TrashList.item(j);
                        Element element = (Element)currentTrashNode;
                        trashInfo.m_recycle_trash[j].m_id = Integer.parseInt(element.getAttribute("id"));
                        trashInfo.m_recycle_trash[j].m_trashClass = 1;
                        trashInfo.m_recycle_trash[j].m_distance = Double.parseDouble(element.getElementsByTagName("distance").item(0).getTextContent());
                        trashInfo.m_recycle_trash[j].m_oldDistance = Double.parseDouble(element.getElementsByTagName("oldDistance").item(0).getTextContent());
                        trashInfo.m_recycle_trash[j].m_height = Double.parseDouble(element.getElementsByTagName("height").item(0).getTextContent());
                    }
                }
                if(!kitchenNum.getAttribute("num").equals("0"))
                {
                    NodeList TrashList = recycleNum.getElementsByTagName("kitchenTrash");
                    for(int j = 0;j < TrashList.getLength();j++)
                    {
                        Node currentTrashNode = TrashList.item(j);
                        Element element = (Element)currentTrashNode;
                        trashInfo.m_kitchen_trash[j].m_id = Integer.parseInt(element.getAttribute("id"));
                        trashInfo.m_kitchen_trash[j].m_trashClass = 2;
                        trashInfo.m_kitchen_trash[j].m_distance = Double.parseDouble(element.getElementsByTagName("distance").item(0).getTextContent());
                        trashInfo.m_kitchen_trash[j].m_oldDistance = Double.parseDouble(element.getElementsByTagName("oldDistance").item(0).getTextContent());
                        trashInfo.m_kitchen_trash[j].m_height = Double.parseDouble(element.getElementsByTagName("height").item(0).getTextContent());
                    }
                }
                if(!otherNum.getAttribute("num").equals("0"))
                {
                    NodeList TrashList = recycleNum.getElementsByTagName("otherTrash");
                    for(int j = 0;j < TrashList.getLength();j++)
                    {
                        Node currentTrashNode = TrashList.item(j);
                        Element element = (Element)currentTrashNode;
                        trashInfo.m_other_trash[j].m_id = Integer.parseInt(element.getAttribute("id"));
                        trashInfo.m_other_trash[j].m_trashClass = 3;
                        trashInfo.m_other_trash[j].m_distance = Double.parseDouble(element.getElementsByTagName("distance").item(0).getTextContent());
                        trashInfo.m_other_trash[j].m_oldDistance = Double.parseDouble(element.getElementsByTagName("oldDistance").item(0).getTextContent());
                        trashInfo.m_other_trash[j].m_height = Double.parseDouble(element.getElementsByTagName("height").item(0).getTextContent());
                    }
                }
                if(!harmNum.getAttribute("num").equals("0"))
                {
                    NodeList TrashList = recycleNum.getElementsByTagName("harmTrash");
                    for(int j = 0;j < TrashList.getLength();j++)
                    {
                        Node currentTrashNode = TrashList.item(j);
                        Element element = (Element)currentTrashNode;
                        trashInfo.m_harm_trash[j].m_id = Integer.parseInt(element.getAttribute("id"));
                        trashInfo.m_harm_trash[j].m_trashClass = 4;
                        trashInfo.m_harm_trash[j].m_distance = Double.parseDouble(element.getElementsByTagName("distance").item(0).getTextContent());
                        trashInfo.m_harm_trash[j].m_oldDistance = Double.parseDouble(element.getElementsByTagName("oldDistance").item(0).getTextContent());
                        trashInfo.m_harm_trash[j].m_height = Double.parseDouble(element.getElementsByTagName("height").item(0).getTextContent());
                    }
                }

                //放入configuration
                configuration.m_trashInfo.put(id,trashInfo);

        }
        */

        //读取xml
        SAXReader reader = new SAXReader();
//        System.out.println(Class.class.getClass().getResource("/").getPath());
        Document document = reader.read(new File("data/trash.xml"));

        Element root = document.getRootElement();
        List trashs = root.elements("trash");


            //对每个地点的垃圾桶来说
            for(Iterator it = trashs.iterator();it.hasNext();)
            {
                TrashInfo trashInfo = new TrashInfo();
                Element element = (Element)it.next();
                int id = Integer.parseInt(element.attribute("id").getText());
                trashInfo.m_lat = Double.parseDouble(element.attribute("lat").getText());
                trashInfo.m_long = Double.parseDouble(element.attribute("lat").getText());



                //recycleNum
                Element recycleNum = element.element("recycleNum");
                if(Integer.parseInt(recycleNum.attribute("num").getText()) != 0)
                {
                    int numnum = Integer.parseInt(recycleNum.attribute("num").getText());
                    trashInfo.m_recycle_trash = new Trash[Integer.parseInt(recycleNum.attribute("num").getText())];
                    List recycleTrashs = recycleNum.elements("recycleTrash");
                    int j = 0;
                    for(Iterator jt = recycleTrashs.iterator();jt.hasNext();)
                    {
                        Element recycleTrash = (Element)jt.next();
                        trashInfo.m_recycle_trash[j] = new Trash(Integer.parseInt(recycleTrash.attribute("id").getText()));
                        trashInfo.m_recycle_trash[j].m_distance = Double.parseDouble(recycleTrash.elementText("distance"));
                        trashInfo.m_recycle_trash[j].m_oldDistance = Double.parseDouble(recycleTrash.elementText("oldDistance"));
                        trashInfo.m_recycle_trash[j].m_height = Double.parseDouble(recycleTrash.elementText("height"));
                        j++;
                    }
                }
                else
                    trashInfo.m_recycle_trash = new Trash[0];
                //kitchenNum
                Element kitchenNum = element.element("kitchenNum");
                if(Integer.parseInt(kitchenNum.attribute("num").getText()) != 0)
                {
                    trashInfo.m_kitchen_trash = new Trash[Integer.parseInt(kitchenNum.attribute("num").getText())];
                    List kitchenTrashs = kitchenNum.elements("kitchenTrash");
                    int j = 0;
                    for(Iterator jt = kitchenTrashs.iterator();jt.hasNext();)
                    {
                        Element kitchenTrash = (Element)jt.next();
                        trashInfo.m_kitchen_trash[j] = new Trash(Integer.parseInt(kitchenTrash.attribute("id").getText()));
                        trashInfo.m_kitchen_trash[j].m_distance = Double.parseDouble(kitchenTrash.elementText("distance"));
                        trashInfo.m_kitchen_trash[j].m_oldDistance = Double.parseDouble(kitchenTrash.elementText("oldDistance"));
                        trashInfo.m_kitchen_trash[j].m_height = Double.parseDouble(kitchenTrash.elementText("height"));
                        j++;
                    }
                }
                else
                    trashInfo.m_kitchen_trash = new Trash[0];
                //otherNum
                Element otherNum = element.element("otherNum");
                if(Integer.parseInt(otherNum.attribute("num").getText()) != 0)
                {
                    trashInfo.m_other_trash = new Trash[Integer.parseInt(otherNum.attribute("num").getText())];
                    List otherTrashs = otherNum.elements("otherTrash");
                    int j = 0;
                    for(Iterator jt = otherTrashs.iterator();jt.hasNext();)
                    {
                        Element otherTrash = (Element)jt.next();
                        trashInfo.m_other_trash[j]= new Trash(Integer.parseInt(otherTrash.attribute("id").getText()));
                        trashInfo.m_other_trash[j].m_distance = Double.parseDouble(otherTrash.elementText("distance"));
                        trashInfo.m_other_trash[j].m_oldDistance = Double.parseDouble(otherTrash.elementText("oldDistance"));
                        trashInfo.m_other_trash[j].m_height = Double.parseDouble(otherTrash.elementText("height"));
                        j++;
                    }
                }
                else
                    trashInfo.m_other_trash = new Trash[0];
                //harmNum
                Element harmNum = element.element("harmNum");
                if(Integer.parseInt(harmNum.attribute("num").getText()) != 0)
                {
                    trashInfo.m_harm_trash = new Trash[Integer.parseInt(harmNum.attribute("num").getText())];
                    List harmTrashs = harmNum.elements("harmTrash");
                    int j = 0;
                    for(Iterator jt = harmTrashs.iterator();jt.hasNext();)
                    {
                        Element harmTrash = (Element)jt.next();
                        trashInfo.m_harm_trash[j] = new Trash(Integer.parseInt(harmTrash.attribute("id").getText()));
                        trashInfo.m_harm_trash[j].m_distance = Double.parseDouble(harmTrash.elementText("distance"));
                        trashInfo.m_harm_trash[j].m_oldDistance = Double.parseDouble(harmTrash.elementText("oldDistance"));
                        trashInfo.m_harm_trash[j].m_height = Double.parseDouble(harmTrash.elementText("height"));
                        j++;
                    }
                }
                else
                    trashInfo.m_harm_trash = new Trash[0];


                configuration.m_trashInfo.put(id,trashInfo);
            }




        }catch (Exception e)
        {
            e.printStackTrace();
            System.out.println("load configuration error");
        }
    }
}
