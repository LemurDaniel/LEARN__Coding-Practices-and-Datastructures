using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// Die Elementvorlage "Leere Seite" wird unter https://go.microsoft.com/fwlink/?LinkId=234238 dokumentiert.

namespace Coding_Practices_and_Datastructures_with_GUIs.Pages
{
    /// <summary>
    /// Eine leere Seite, die eigenständig verwendet oder zu der innerhalb eines Rahmens navigiert werden kann.
    /// </summary>
    public sealed partial class Maze : Page
    {
        private int cols = 50, rows = 50;
        public Maze()
        {
            this.InitializeComponent();
            int w = (int)TheGrid.Width / cols;
            int h = (int)TheGrid.Height / rows;
            for (int i = 0; i < rows; i++) TheGrid.RowDefinitions.Add(new RowDefinition { Height = new GridLength(h) });
            for (int i = 0; i < cols; i++) TheGrid.ColumnDefinitions.Add(new ColumnDefinition { Width = new GridLength(w) });
        }
    }
}
